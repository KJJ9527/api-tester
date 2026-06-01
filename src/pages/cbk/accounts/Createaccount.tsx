// src/pages/cbk/accounts/CreateAccount.tsx
import React, { useState } from 'react';
import {
  Card,
  Form,
  Input,
  Select,
  Button,
  Table,
  Tag,
  Typography,
  Space,
  Divider,
  Spin,
  message,
  Row,
  Col,
} from 'antd';
import { SendOutlined, CopyOutlined } from '@ant-design/icons';
import { useConfigStore } from '@/stores/configStore';
import { getApiClient } from '@/api/client';

const { Title, Text } = Typography;
const { Option } = Select;

// 请求参数表格列定义
const columns = [
  {
    title: '参数名',
    dataIndex: 'name',
    key: 'name',
    width: 150,
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
    width: 100,
  },
  {
    title: '必填',
    dataIndex: 'required',
    key: 'required',
    width: 80,
    render: (required: boolean) => (
      <Tag color={required ? 'red' : 'default'}>{required ? '是' : '否'}</Tag>
    ),
  },
  {
    title: '描述',
    dataIndex: 'description',
    key: 'description',
  },
];

// 静态参数文档
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

const CreateAccount: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const { apiBaseURL } = useConfigStore();

  // 提交请求
  const handleSubmit = async () => {
    try {
      const apiClient = getApiClient(); // 如果未配置后端地址，会抛出错误
      const values = await form.validateFields();
      setLoading(true);

      // 补充 timestamp 和 sign（示例签名，实际需按后端规则生成）
      const payload = {
        ...values,
        timestamp: Date.now(),
        sign: `demo_sign_${Math.random().toString(36).substring(2, 10)}`,
      };

      const responseData = await apiClient.post('/v1/account/create', payload);
      setResponse(responseData);
      message.success('请求成功');
    } catch (error: any) {
      if (error.message?.includes('请先在页面配置后端地址')) {
        message.error('请先点击右上角“配置后端地址”按钮设置后端服务地址');
      } else {
        message.error(error.message || '请求失败');
        setResponse({ error: error.message });
      }
    } finally {
      setLoading(false);
    }
  };

  // 复制 curl 命令
  const copyCurl = () => {
    const curl = `curl -X POST "${apiBaseURL}/v1/account/create" \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(form.getFieldsValue(), null, 2)}'`;
    navigator.clipboard.writeText(curl);
    message.success('cURL 命令已复制');
  };

  return (
    <div>
      <Card
        title={
          <Space>
            <Tag color="green">POST</Tag>
            <Text code>/v1/account/create</Text>
            <Text type="secondary">创建新账户并返回账户ID</Text>
          </Space>
        }
        extra={
          <Button icon={<CopyOutlined />} onClick={copyCurl}>
            复制 cURL
          </Button>
        }
      >
        {/* 请求参数表格 */}
        <Title level={5}>REQUEST PARAMS</Title>
        <Table
          dataSource={paramDefinitions}
          columns={columns}
          pagination={false}
          size="small"
          rowKey="name"
          style={{ marginBottom: 24 }}
        />

        {/* 请求表单 */}
        <Title level={5}>REQUEST</Title>
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            merchantId: 'MCH_20240101_001',
            accountName: '张三',
            accountType: 'PERSONAL',
            idCardNo: '310xxxxxxxxxxxxxx',
            bankCode: 'ICBC',
            mobile: '138xxxxxxxx',
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="merchantId"
                label="merchantId"
                rules={[{ required: true, message: '请输入商户ID' }]}
              >
                <Input placeholder="商户唯一标识符" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="accountName"
                label="accountName"
                rules={[{ required: true, message: '请输入账户姓名' }]}
              >
                <Input placeholder="账户持有人真实姓名" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="accountType" label="accountType">
                <Select placeholder="选择账户类型">
                  <Option value="PERSONAL">PERSONAL</Option>
                  <Option value="ENTERPRISE">ENTERPRISE</Option>
                  <Option value="VIRTUAL">VIRTUAL</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="idCardNo" label="idCardNo">
                <Input placeholder="身份证号" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="bankCode" label="bankCode">
                <Input placeholder="银行编码" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="mobile" label="mobile">
                <Input placeholder="手机号" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Space>
              <Button
                type="primary"
                icon={<SendOutlined />}
                onClick={handleSubmit}
                loading={loading}
              >
                发送请求
              </Button>
              <Button onClick={() => form.resetFields()}>重置</Button>
            </Space>
          </Form.Item>
        </Form>

        {/* 响应结果 */}
        {(response || loading) && (
          <>
            <Divider />
            <Title level={5}>RESPONSE</Title>
            {loading ? (
              <Spin />
            ) : (
              <Card size="small">
                <pre style={{ margin: 0, overflow: 'auto' }}>
                  {JSON.stringify(response, null, 2)}
                </pre>
              </Card>
            )}
          </>
        )}
      </Card>
    </div>
  );
};

export default CreateAccount;