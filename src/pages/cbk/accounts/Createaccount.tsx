// src/pages/cbk/accounts/CreateAccount.tsx
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
import { useConfigStore } from '@/stores/configStore';
import { getApiClient } from '@/api/client';
import Editor from '@monaco-editor/react';
import { useOutletContext } from 'react-router-dom';

const { Text } = Typography;
const { TabPane } = Tabs;

// 表格列定义（保持不变）
const columns = [
  { title: '参数名', dataIndex: 'name', key: 'name', width: 150 },
  { title: '类型', dataIndex: 'type', key: 'type', width: 100 },
  {
    title: '必填',
    dataIndex: 'required',
    key: 'required',
    width: 80,
    render: (required: boolean) => (
      <Tag color={required ? 'red' : 'default'}>{required ? '是' : '否'}</Tag>
    ),
  },
  { title: '描述', dataIndex: 'description', key: 'description' },
];

const paramDefinitions = [
  { name: 'merchantId', type: 'string', required: true, description: '商户唯一标识符，由平台分配' },
  { name: 'accountName', type: 'string', required: true, description: '账户持有人真实姓名' },
  { name: 'accountType', type: 'enum', required: false, description: '账户类型：PERSONAL | ENTERPRISE | VIRTUAL' },
  { name: 'idCardNo', type: 'string', required: false, description: '身份证号（个人账户时必填）' },
  { name: 'bankCode', type: 'string', required: false, description: '银行编码，如 ICBC' },
  { name: 'mobile', type: 'string', required: false, description: '手机号' },
  { name: 'timestamp', type: 'number', required: true, description: 'Unix时间戳（毫秒）' },
  { name: 'sign', type: 'string', required: true, description: '签名' },
];

const defaultRequestJson = {
  merchantId: 'MCH_20240101_001',
  accountName: '张三',
  accountType: 'PERSONAL',
  idCardNo: '310xxxxxxxxxxxxxx',
  bankCode: 'ICBC',
  mobile: '138xxxxxxxx',
  timestamp: 1704067200000,
  sign: 'A3F2...8C1D',
};

const CreateAccount: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [requestJson, setRequestJson] = useState(JSON.stringify(defaultRequestJson, null, 2));
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('request');
  const { apiBaseURL } = useConfigStore();
  const { isDarkMode } = useOutletContext<{ isDarkMode: boolean }>();

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

  // 格式化 JSON（自动美化）
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
    try {
      const apiClient = getApiClient();
      setLoading(true);
      const responseData = await apiClient.post('/v1/account/create', payload);
      setResponse(responseData);
      message.success('请求成功');
      setActiveTab('response');
    } catch (error: any) {
      if (error.message?.includes('请先在页面配置后端地址')) {
        message.error('请先点击右上角“配置后端地址”按钮设置后端服务地址');
      } else {
        message.error(error.message || '请求失败');
        setResponse({ error: error.message });
      }
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

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRequestJson(e.target.value);
    try {
      JSON.parse(e.target.value);
      setJsonError(null);
    } catch (err: any) {
      setJsonError(err.message);
    }
  };

  return (
    <Row gutter={24} style={{ height: '100%' }}>
      {/* 左侧卡片：参数说明表格 */}
      <Col xs={24} sm={24} md={14} lg={14} style={{ height: '100%' }}>
        <Card
          title="REQUEST PARAMS"
          size="small"
          style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
          bodyStyle={{ flex: 1, overflow: 'hidden', padding: '24px' }}
        >
          <div style={{ height: '100%', overflow: 'auto' }}>
            <Table
              dataSource={paramDefinitions}
              columns={columns}
              pagination={false}
              size="small"
              rowKey="name"
              scroll={{ x: 'max-content' }}
            />
          </div>
        </Card>
      </Col>

      {/* 右侧卡片：JSON 编辑器 + 响应 */}
      <Col xs={24} sm={24} md={10} lg={10} style={{ height: '100%' }}>
        <Card
          title={
            <Space>
              <Tag color="green">POST</Tag>
              <Text>/v1/account/create</Text>
              <Text type="secondary">创建新账户并返回账户ID</Text>
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
                  height="300px"
                  language="json"
                  value={requestJson}
                  onChange={(value) => handleJsonChange({ target: { value } } as any)}
                  theme={isDarkMode ? 'vs-dark' : 'vs'}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    formatOnPaste: true,
                    automaticLayout: true,
                  }}
                />
                {jsonError && (
                  <Text type="danger" style={{ display: 'block', marginBottom: 16 }}>
                    格式错误：{jsonError}
                  </Text>
                )}
                <Space>
                  <Button type="primary" icon={<SendOutlined />} onClick={handleSubmit} loading={loading}>
                    发送请求
                  </Button>
                  <Button icon={<FormatPainterOutlined />} onClick={formatJson}>
                    格式化
                  </Button>
                  <Button icon={<ReloadOutlined />} onClick={handleReset}>
                    重置
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

export default CreateAccount;