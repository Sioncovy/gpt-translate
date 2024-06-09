import { Button, Flex } from 'antd';
import { FC } from 'react';

interface Props {
  text: string;
  startTrans: () => void;
}

const Menu: FC<Props> = ({ text, startTrans }) => {
  return (
    <Flex gap={8}>
      <Button
        size="small"
        onClick={() => {
          console.log('selectedText:', text);
          startTrans();
        }}
      >
        翻译
      </Button>
      <Button
        size="small"
        onClick={() => {
          console.log('selectedText:', text);
        }}
      >
        复制
      </Button>
    </Flex>
  );
};

export default Menu;
