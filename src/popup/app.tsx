import { Card, Flex, Input, Typography } from 'antd';
import { useEffect, useState } from 'react';

const Popup = () => {
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    chrome.storage.local.get('apiKey', (result) => {
      setApiKey(result.apiKey);
    });
  }, []);

  useEffect(() => {
    // localStorage.setItem('apiKey', apiKey);
    chrome.storage.local.set({ apiKey });
  }, [apiKey]);

  return (
    <Card size="small" style={{ width: 400 }}>
      <Typography.Title level={4} style={{ marginTop: 4 }}>
        配置
      </Typography.Title>
      <Flex vertical gap={4}>
        <div>API Key</div>
        <Input
          value={apiKey}
          onChange={(e) => {
            setApiKey(e.target.value);
          }}
          placeholder="请输入 API Key"
        />
      </Flex>
    </Card>
  );
};

export default Popup;
