import React, { useState } from 'react';
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
}

// 组件 Props
interface ApiTesterProps {
  title: string;                     // 卡片标题（如 "POST /v1/account/create"）
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'; // 请求方法，默认 POST
  path: string;                     // 请求路径
  description?: string;              // 接口描述
  paramDefinitions: ParamDefinition[]; // 参数表格数据
  defaultRequestJson: Record<string, any>; // 默认请求 JSON
}

const ApiTester: React.FC<ApiTesterProps> = ({
  method = 'POST',
  path,
  description,
  paramDefinitions,
  defaultRequestJson,
}) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [requestJson, setRequestJson] = useState(JSON.stringify(defaultRequestJson, null, 2));
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('request');
  const { apiBaseURL } = useConfigStore();
  const { isDarkMode } = useOutletContext<{ isDarkMode: boolean }>();

  // 表格列定义
  const columns = [
    { title: '参数名', dataIndex: 'name', key: 'name', width: 150 },
    { title: '类型', dataIndex: 'type', key: 'type', width: 100 },
    { title: '长度', dataIndex: 'length', key: 'length', width: 100 },
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
    { title: '描述', dataIndex: 'description', key: 'description' },
  ];

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
      const formatted = JSON.stringify(parsed, null, 2);
      setRequestJson(formatted);
      setJsonError(null);
      message.success('JSON 已格式化');
    } catch (e: any) {
      message.error('JSON 格式错误，无法格式化');
    }
  };

  const handleSubmit = async () => {
    const payload = parseRequest();
    if (!payload) {
      message.error('请求 JSON 格式错误，请修正后重试');
      return;
    }
    if (!apiBaseURL) {
      message.error('请先点击右上角“配置后端地址”按钮设置后端服务地址');
      return;
    }
    try {
      const apiClient = getApiClient();
      setLoading(true);
      const responseData = await apiClient.request({
        method,
        url: apiBaseURL + path,
        data: payload,
      });
      setResponse(responseData);
      message.success('请求成功');
      setActiveTab('response');
    } catch (error: any) {
      message.error(error.message || '请求失败');
      setResponse({ error: error.message });
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
        <Card
          title="REQUEST PARAMS"
          style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
          bodyStyle={{ flex: 1, overflow: 'hidden', padding: '24px' }}
        >
          <div style={{ height: '100%', overflow: 'auto', minHeight: 0 }}>
            <Table
              dataSource={paramDefinitions}
              columns={columns}
              pagination={false}
              size="small"
              rowKey="name"
              scroll={{ x: 'max-content' }}
              expandable={{
                // 有 childrenFields 的行才能展开
                rowExpandable: (record) => !!record.childrenFields && record.childrenFields.length > 0,
                // 展开后渲染的子表格
                expandedRowRender: (record) => (
                  <div style={{ paddingLeft: 24 }}>
                    <Table
                      dataSource={record.childrenFields || []}
                      columns={columns}   // 复用相同的列定义
                      pagination={false}
                      size="small"
                      rowKey="name"
                      scroll={{ x: 'max-content', y: 300 }}   // 增加垂直滚动，高度300px
                    />
                  </div>
                ),
              }}
            />
          </div>
        </Card>
      </Col>

      {/* 右侧：编辑器 + 响应 */}
      <Col xs={24} sm={24} md={11} lg={11} style={{ height: '100%' }}>
        <Card
          title={
            <Space>
              <Tag color={method === 'POST' ? 'green' : 'blue'}>{method}</Tag>
              <Text>{path}</Text>
              {description && <Text type="secondary">{description}</Text>}
            </Space>
          }
          extra={
            <Button icon={<CopyOutlined />} onClick={handleCopy}>
              复制 JSON
            </Button>
          }
          style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
          bodyStyle={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px' }}
        >
          <Tabs activeKey={activeTab} onChange={setActiveTab} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <TabPane tab="REQUEST" key="request" style={{ flex: 1 }}>
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Editor
                  height="500px"
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
                <Space style={{ display: 'flex', marginTop: 16 }}>
                  {apiBaseURL ? (
                    <Text copyable style={{ fontSize: 14 }}>
                      {`${apiBaseURL.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`}
                    </Text>
                  ) : (
                    <Text type="danger" style={{ fontSize: 12 }}>
                      未配置后端地址
                    </Text>
                  )}
                  <Button icon={<FormatPainterOutlined />} onClick={formatJson}>
                    格式化
                  </Button>
                  <Button icon={<ReloadOutlined />} onClick={handleReset}>
                    重置
                  </Button>
                  <Button icon={<SendOutlined />} type="primary" onClick={handleSubmit} loading={loading}>
                    发送请求
                  </Button>
                </Space>
              </div>
            </TabPane>
            <TabPane tab="RESPONSE" key="response" style={{ flex: 1 }}>
              <div style={{ height: '100%', overflow: 'auto' }}>
                {loading ? (
                  <Spin />
                ) : response ? (
                  <pre style={{ margin: 0, background: 'transparent', whiteSpace: 'pre-wrap' }}>
                    {JSON.stringify(response, null, 2)}
                  </pre>
                ) : (
                  <Text type="secondary">暂无响应，请发送请求</Text>
                )}
              </div>
            </TabPane>
          </Tabs>
        </Card>
      </Col>
    </Row>
  );
};

export default ApiTester;