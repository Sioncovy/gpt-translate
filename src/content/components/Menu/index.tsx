import { Button, Flex } from 'antd';
import { FC, useEffect } from 'react';
import { copyTextToClipboard } from '../../../utils';

interface Props {
  text: string;
  startTrans: () => void;
}

const Menu: FC<Props> = ({ text, startTrans }) => {
  useEffect(() => {
    console.log('Menu 挂载了');
    return () => {
      console.log('Menu 卸载了');
    };
  }, []);
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
          copyTextToClipboard(text);
        }}
      >
        复制
      </Button>
    </Flex>
  );
};

export default Menu;
