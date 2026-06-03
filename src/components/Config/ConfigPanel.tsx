// src/components/ConfigPanel.tsx
import { Button, Modal, Input, message, Space, Divider } from 'antd';
import { useState } from 'react';
import { useConfigStore } from '@/stores/configStore';

export default function ConfigPanel() {
  const { apiBaseURL, secretKey, setApiBaseURL, setSecretKey } = useConfigStore();
  const [open, setOpen] = useState(false);
  const [tempApiURL, setTempApiURL] = useState(apiBaseURL);
  const [tempSecretKey, setTempSecretKey] = useState(secretKey);

  const handleSave = () => {
    if (!tempApiURL) {
      message.error('请输入后端地址');
      return;
    }
    setApiBaseURL(tempApiURL);
    setSecretKey(tempSecretKey);
    message.success('配置已保存');
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        基础配置
      </Button>
      <Modal title="系统配置" open={open} onOk={handleSave} onCancel={() => setOpen(false)} width={500}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <div>后端 API 地址</div>
            <Input
              placeholder="例如 https://api.pay.com/v1"
              value={tempApiURL}
              onChange={(e) => setTempApiURL(e.target.value)}
            />
          </div>
          <Divider />
          <div>
            <div>签名密钥 (Secret Key)</div>
            <Input.Password
              placeholder="用于 MD5 签名的密钥"
              value={tempSecretKey}
              onChange={(e) => setTempSecretKey(e.target.value)}
            />
          </div>
        </Space>
      </Modal>
    </>
  );
}