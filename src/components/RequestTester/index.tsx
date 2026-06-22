import React, { useMemo, useState } from 'react';
import {
  Card,
  Button,
  Table,
  Tag,
  Typography,
  Space,
  message,
  Row,
  Col,
  Tabs,
  Spin,
} from 'antd';
import { SendOutlined, CopyOutlined, ReloadOutlined, FormatPainterOutlined } from '@ant-design/icons';
import { useOutletContext } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { useConfigStore } from '@/stores/configStore';
import { getApiClient } from '@/api/client';
import MD5 from 'crypto-js/md5';

const { Text } = Typography;
const { TabPane } = Tabs;

// 参数定义类型
export interface ParamDefinition {
  name: string;
  type: string;
  length: number;
  required: string; // 'true' | 'false' | 'conditional'
  description: string;
  childrenFields?: ParamDefinition[]; // 可选的子表格数据
  customChildrenData?: any[]; // 可选的自定义子表格数据
  subColumns?: any[];                        // 新增：自定义子表格列定义
}

// 组件 Props
interface ApiTesterProps {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | ''; // 请求方法，默认 POST
  path: string;                     // 请求路径
  description?: string;              // 接口描述
  paramDefinitions: ParamDefinition[]; // 参数表格数据
  responseParamDefinitions?: ParamDefinition[]; // 新增：响应参数
  defaultRequestJson: Record<string, any>; // 默认请求 JSON
  stringifyFields?: string[];  // 新增：需要转换为 JSON 字符串的字段名数组
  excludeSignFields?: string[];     // 签名时排除的字段（如 ['inst_no_day']）
  isDownload?: boolean;             // 是否为下载接口
}

const ApiTester: React.FC<ApiTesterProps> = ({
  method = 'POST',
  path,
  description,
  paramDefinitions,
  responseParamDefinitions,
  defaultRequestJson,
  stringifyFields,
  excludeSignFields = [],
  isDownload = false,
}) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [requestJson, setRequestJson] = useState(JSON.stringify(defaultRequestJson, null, 2));
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('request');
  const { apiBaseURL } = useConfigStore();
  const { isDarkMode } = useOutletContext<{ isDarkMode: boolean }>();


  // 在组件内部，计算按钮是否禁用
  const isSubmitDisabled = !path || !apiBaseURL;

  // 表格列定义
  const columns = [
    { title: '参数名', dataIndex: 'name', key: 'name', width: 120 },
    { title: '类型', dataIndex: 'type', key: 'type', width: 100 },
    { title: '长度', dataIndex: 'length', key: 'length', width: 50 },
    {
      title: '必填',
      dataIndex: 'required',
      key: 'required',
      width: 80,
      render: (required: string) => {
        const colorMap: Record<string, string> = {
          '是': 'red',
          '否': 'default',
          '条件必填': 'orange',
        };
        return <Tag color={colorMap[required] || 'default'}>{required}</Tag>;
      },
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      render: (text: string, record: ParamDefinition) => {
        // 针对 key_sign 字段，将描述中的“点击查看签名算法”转换为链接
        if (record.name === 'key_sign' && text.includes('点击查看签名算法')) {
          // 替换成实际签名算法页面的 URL
          const signAlgorithmUrl = 'https://help.lcsw.cn/xrmpic/tisnldchblgxohfl/rinsc3#title-node6'; // 修改为真实地址
          return (
            <span>
              签名检验串，
              <a href={signAlgorithmUrl} target="_blank" rel="noopener noreferrer">
                点击查看签名算法
              </a>
            </span>
          );
        }
        return text;
      },
    },
  ];

  const renderExpandedRow = (record: ParamDefinition) => {
    const dataSource = record.customChildrenData || record.childrenFields || [];
    const cols = record.subColumns || columns;
    if (!dataSource.length) return null;
    return (
      <div style={{ paddingLeft: 24 }}>
        <Table
          dataSource={dataSource}
          columns={cols}
          pagination={false}
          size="small"
          rowKey={(record, index) => (index ?? 0).toString()}
          scroll={{ x: '600px', y: '300px' }}
        />
      </div>
    );
  };

  const parseRequest = (): any => {
    try {
      const parsed = JSON.parse(requestJson);
      setJsonError(null);
      return parsed;
    } catch (e: any) {
      setJsonError(e.message);
      return null;
    }
  };

  const formatJson = () => {
    try {
      const parsed = JSON.parse(requestJson);
      // 先校验字段
      if (!validatePayloadFields(parsed)) {
        return; // 校验失败，不格式化
      }
      const formatted = JSON.stringify(parsed, null, 2);
      setRequestJson(formatted);
      setJsonError(null);
      message.success('JSON 已格式化');
    } catch (e: any) {
      message.error('JSON 格式错误，无法格式化');
    }
  };

  const buildUrl = (template: string, params: Record<string, any>): string => {
    let url = template;
    for (const [key, value] of Object.entries(params)) {
      const placeholder = `{${key}}`;
      if (url.includes(placeholder)) {
        url = url.replace(new RegExp(placeholder, 'g'), encodeURIComponent(String(value)));
      }
    }
    return url;
  };

  // 字典序排序并拼接字符串
  const sortAndConcat = (obj: Record<string, any>): string => {
    const keys = Object.keys(obj).sort(); // 字典序升序
    const parts: string[] = [];
    for (const key of keys) {
      if (key === 'key_sign') continue; // 签名本身不参与签名
      let value = obj[key];
      if (value !== undefined && value !== null) {
        if (typeof value === 'object') {
          value = JSON.stringify(value);
        } else {
          value = String(value);
        }
        parts.push(`${key}=${value}`);
      }
    }
    return parts.join('&');
  };

  // 生成 MD5 签名
  const generateSign = (payload: Record<string, any>, secretKey: string): string => {
    const baseString = sortAndConcat(payload);
    // 判断是否存在非空的 inst_no 字段
    const hasInstNo = payload.hasOwnProperty('inst_no') && payload.inst_no && payload.inst_no !== '';
    const suffix = hasInstNo ? `&key=${secretKey}` : `&access_token=${secretKey}`;
    const signString = baseString + suffix;
    return MD5(signString).toString();
  };

  // 在组件内部，计算允许的字段名列表（使用 useMemo 优化）
  const allowedFieldNames = useMemo(() => paramDefinitions.map(def => def.name), [paramDefinitions]);

  // 校验函数
  const validatePayloadFields = (payload: Record<string, any>): boolean => {
    const extraFields = Object.keys(payload).filter(key => !allowedFieldNames.includes(key));
    if (extraFields.length > 0) {
      message.error(`JSON 数据包含不支持的字段：${extraFields.join(', ')}`);
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    let payload = parseRequest();
    if (!payload) {
      message.error('请求 JSON 格式错误，请修正后重试');
      return;
    }

    if (!apiBaseURL) {
      message.error('请先点击右上角“基础配置”按钮设置后端服务地址');
      return;
    }

    // 校验字段
    if (!validatePayloadFields(payload)) {
      return;
    }

    // 1. 对需要字符串化的字段进行处理（例如 cust_info）
    if (stringifyFields?.length) {
      // 浅拷贝，避免修改原对象（parseRequest 返回的是新对象，但拷贝更安全）
      payload = { ...payload };
      for (const field of stringifyFields) {
        const value = payload[field];
        // 如果字段存在且是对象（不是 null）且不是字符串，则转为 JSON 字符串
        if (value !== undefined && value !== null && typeof value === 'object' && !(value instanceof Date)) {
          payload[field] = JSON.stringify(value);
        }
      }
    }

    // 2. 获取签名密钥并生成签名
    const { secretKey } = useConfigStore.getState();
    if (!secretKey) {
      message.error('请先在配置中填写签名密钥 (Secret Key)');
      return;
    }

    const signPayload = { ...payload };
    if (excludeSignFields?.length) {
      for (const field of excludeSignFields) {
        delete signPayload[field];
      }
    }
    const sign = generateSign(signPayload, secretKey);
    payload.key_sign = sign;


    try {
      setLoading(true);
      if (isDownload) {
        const fullUrl = `${apiBaseURL.replace(/\/$/, '')}${buildUrl(path, payload)}`;
        window.open(fullUrl, '_blank');
        message.success('正在下载，请检查浏览器弹窗');
        setActiveTab('response');
      } else {
        const apiClient = getApiClient();
        setLoading(true);
        const responseData = await apiClient.request({
          method,
          url: path,
          data: payload,
        });
        setResponse(responseData.data);
        message.success('请求成功');
        setActiveTab('response');
      }

    } catch (error: any) {
      // 提取错误信息
      const backendError = error.response?.data;
      const errorMsg = backendError?.return_msg || error.message || '请求失败';
      message.error(errorMsg);
      // 也可以展示后端返回的错误详情
      setResponse(backendError || { error: errorMsg });
      setActiveTab('response');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setRequestJson(JSON.stringify(defaultRequestJson, null, 2));
    setJsonError(null);
    setResponse(null);
    setActiveTab('request');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(requestJson);
    message.success('请求 JSON 已复制');
  };

  const handleJsonChange = (value: string | undefined) => {
    const newValue = value || '';
    setRequestJson(newValue);
    try {
      JSON.parse(newValue);
      setJsonError(null);
    } catch (err: any) {
      setJsonError(err.message);
    }
  };

  return (
    <Row gutter={24} style={{ height: '100%' }}>
      {/* 左侧：参数表格 */}
      <Col xs={24} sm={24} md={13} lg={13} style={{ height: '100%' }}>
        {/* REQUEST PARAMS 卡片 */}
        <Card
          title="参数说明"
          style={{ height: '100%', display: 'flex', flexDirection: 'column', minHeight: 0 }}
          styles={{ body: { flex: 1, display: 'flex', flexDirection: 'column', padding: '16px', overflow: 'hidden' } }}
        >
          <Tabs
            defaultActiveKey="request"
            style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}
            destroyOnHidden
          >
            <TabPane tab="请求参数" key="request" style={{ flex: 1, overflow: 'auto' }}>
              <Table
                dataSource={paramDefinitions}
                columns={columns}
                pagination={false}
                size="small"
                rowKey="name"
                expandable={{
                  rowExpandable: (record) => !!(record.customChildrenData?.length || record.childrenFields?.length),
                  expandedRowRender: renderExpandedRow,
                }}
              />
            </TabPane>
            <TabPane tab="返回参数" key="response" style={{ flex: 1, overflow: 'auto' }}>
              {responseParamDefinitions && responseParamDefinitions.length > 0 ? (
                <Table
                  dataSource={responseParamDefinitions}
                  columns={columns}
                  pagination={false}
                  size="small"
                  rowKey="name"
                  expandable={{
                    rowExpandable: (record) => !!(record.customChildrenData?.length || record.childrenFields?.length),
                    expandedRowRender: renderExpandedRow,
                  }}
                />
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                  <Text type="secondary">暂无响应参数</Text>
                </div>
              )}
            </TabPane>
          </Tabs>
        </Card>
      </Col>

      {/* 右侧：编辑器 + 响应 */}
      <Col xs={24} sm={24} md={11} lg={11} style={{ height: '100%' }}>
        <Card
          title={
            <Space>
              <Tag color={method === 'POST' ? 'green' : 'blue'}>{method}</Tag>
              <Text copyable>{path}</Text>
              {description && <Text type="secondary">{description}</Text>}
            </Space>
          }
          extra={
            <Button icon={<CopyOutlined />} onClick={handleCopy}>
              复制 JSON
            </Button>
          }
          style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
          styles={{ body: { flex: 1, display: 'flex', flexDirection: 'column', padding: '24px', overflow: 'hidden' } }}
        >
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}
            destroyOnHidden
          >
            <TabPane tab="REQUEST" key="request" style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                <Editor
                  height="100%"
                  language="json"
                  value={requestJson}
                  onChange={handleJsonChange}
                  theme={isDarkMode ? 'vs-dark' : 'vs'}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                    formatOnPaste: true,
                    automaticLayout: true,
                    scrollBeyondLastLine: false,
                  }}
                />
                {jsonError && (
                  <Text type="danger" style={{ display: 'block', marginBottom: 16, marginTop: 8 }}>
                    格式错误：{jsonError}
                  </Text>
                )}
              </div>
            </TabPane>
            <TabPane tab="RESPONSE" key="response" style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ flex: 1, overflow: 'auto', minHeight: 0 }}>
                {loading ? (
                  <Spin />
                ) : response ? (
                  <Editor
                    height="100%"
                    language="json"
                    value={JSON.stringify(response, null, 2)}
                    theme={isDarkMode ? 'vs-dark' : 'vs'}
                    options={{
                      readOnly: true,
                      minimap: { enabled: false },
                      fontSize: 14,
                      fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                      automaticLayout: true,
                      scrollBeyondLastLine: false,
                    }}
                  />
                ) : (
                  <Text type="secondary">暂无响应，请发送请求</Text>
                )}
              </div>
            </TabPane>
          </Tabs>
          {/* 底部按钮区域 */}
          <div style={{ flexShrink: 0, marginTop: 16, borderTop: `1px solid ${isDarkMode ? '#303030' : '#f0f0f0'}`, paddingTop: 16 }}>
            <Space style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'flex-end' }}>
              <Button icon={<FormatPainterOutlined />} onClick={formatJson}>
                格式化
              </Button>
              <Button icon={<ReloadOutlined />} onClick={handleReset}>
                重置
              </Button>
              <Button icon={<SendOutlined />} type="primary" onClick={handleSubmit} loading={loading} disabled={isSubmitDisabled}>
                发送请求
              </Button>
            </Space>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default ApiTester;