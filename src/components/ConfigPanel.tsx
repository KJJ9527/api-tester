// src/components/ConfigPanel.tsx
import { Modal, Input, Button, message } from 'antd';
import { useConfigStore } from '@/stores/configStore';
import { useState } from 'react';

export default function ConfigPanel() {
  const { apiBaseURL, setApiBaseURL } = useConfigStore();
  const [tempURL, setTempURL] = useState(apiBaseURL);
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    if (!tempURL) {
      message.error('请输入后端地址');
      return;
    }
    setApiBaseURL(tempURL);
    message.success('已保存，后续请求将使用新地址');
    setOpen(false);
  };

  return (
    <>
      <Button type="link" onClick={() => setOpen(true)}>
        配置后端地址
      </Button>
      <Modal
        title="设置后端 API 地址"
        open={open}
        onOk={handleSave}
        onCancel={() => setOpen(false)}
      >
        <Input
          placeholder="例如 https://api.pay.com/v1"
          value={tempURL}
          onChange={(e) => setTempURL(e.target.value)}
        />
        <div style={{ marginTop: 8, color: '#999' }}>
          当前地址：{apiBaseURL || '未配置'}
        </div>
      </Modal>
    </>
  );
}