import { useAsyncEffect } from 'ahooks';
import { Button, Card, Flex } from 'antd';
import OpenAI from 'openai';
import { FC } from 'react';
import { copyTextToClipboard } from '../../../utils';

interface Props {
  text: string;
  onStream: (text: string) => void;
  transText: string;
  closeTrans: () => void;
  apiKey: string;
}

const TransResult: FC<Props> = ({
  text,
  onStream,
  transText,
  closeTrans,
  apiKey,
}) => {
  const openai = new OpenAI({
    apiKey: apiKey || '',
    dangerouslyAllowBrowser: true,
  });

  useAsyncEffect(async () => {
    console.log('开始翻译', text);
    if (!openai) {
      return;
    }

    const stream = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            '请对以下发送的文字只进行翻译，不要添加多余内容。对于纯英文的文本翻译为中文，对于包含中文的文本翻译为英文。',
        },
        { role: 'user', content: text },
      ],
      stream: true,
    });

    for await (const chunk of stream) {
      onStream(chunk.choices[0]?.delta?.content || '');
    }
  }, []);

  return (
    <Flex vertical gap={12}>
      <Flex gap={12}>
        <Card
          title="原文"
          size="small"
          styles={{
            body: { maxWidth: 240, maxHeight: 300, overflow: 'auto' },
          }}
        >
          {text}
        </Card>
        <Card
          title="译文"
          size="small"
          styles={{
            body: { maxWidth: 400, maxHeight: 300, overflow: 'auto' },
          }}
        >
          {transText}
        </Card>
      </Flex>
      <Flex gap={8}>
        <Button
          size="small"
          onClick={() => {
            closeTrans();
          }}
        >
          关闭
        </Button>
        <Button
          size="small"
          onClick={() => {
            copyTextToClipboard(text);
          }}
        >
          复制原文
        </Button>
        <Button
          size="small"
          onClick={() => {
            copyTextToClipboard(transText);
          }}
        >
          复制译文
        </Button>
      </Flex>
    </Flex>
  );
};

export default TransResult;
