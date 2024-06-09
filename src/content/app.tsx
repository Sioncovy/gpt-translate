import { useEffect, useState } from 'react';
import styles from './app.module.less';
import Menu from './components/Menu';
import TransResult from './components/TransResult';
import { useLatest } from 'ahooks';

const App = () => {
  const [position, setPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const [selectedText, setSelectedText] = useState<string>('');
  const [transText, setTransText] = useState<string | null>(null);
  const transTextRef = useLatest(transText);

  const onStream = (content: string) => {
    console.log('✨  ~ onStream ~ content:', content);
    transTextRef.current = (transTextRef.current || '').concat(content || '');
    setTransText(transTextRef.current);
  };

  const startTrans = () => {
    setTransText('');
  };

  useEffect(() => {
    document.addEventListener('mouseup', () => {
      const selection = window.getSelection();
      if (selection === null) {
        return;
      }
      const text = selection.toString().trim();

      if (text.length > 0) {
        const range = selection.getRangeAt(0).getBoundingClientRect();
        setPosition({
          top: range.top + window.scrollY - 30, // Adjust position as needed
          left: range.left + window.scrollX,
        });
        setSelectedText(text);
      } else {
        setPosition(null);
      }
    });
  }, []);

  return (
    position && (
      <div className={styles.app} style={{ ...position }}>
        {transText !== null ? (
          <TransResult
            text={selectedText}
            onStream={onStream}
            transText={transText}
          />
        ) : (
          <Menu text={selectedText} startTrans={startTrans} />
        )}
      </div>
    )
  );
};

export default App;
