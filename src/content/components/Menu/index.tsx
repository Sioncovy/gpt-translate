import { Button, Flex } from 'antd';
import { FC } from 'react';
import { copyTextToClipboard } from '../../../utils';

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
          copyTextToClipboard(text);
        }}
      >
        复制
      </Button>
    </Flex>
  );
};

export default Menu;
