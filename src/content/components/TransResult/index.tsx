import { useAsyncEffect } from 'ahooks';
import { Card } from 'antd';
import OpenAI from 'openai';
import { FC } from 'react';

interface Props {
  text: string;
  onStream: (text: string) => void;
  transText: string;
}

const TransResult: FC<Props> = ({ text, onStream, transText }) => {
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  useAsyncEffect(async () => {
    console.log('开始翻译', text);

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

  return <Card>{transText}</Card>;
};

export default TransResult;
