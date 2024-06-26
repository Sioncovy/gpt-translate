import { useLatest } from 'ahooks';
import { useEffect, useRef, useState } from 'react';
import styles from './app.module.less';
import Menu from './components/Menu';
import TransResult from './components/TransResult';

const App = () => {
  const [position, setPosition] = useState<{
    top?: number;
    bottom?: number;
    left: number;
  } | null>(null);

  const [apiKey, setApiKey] = useState('');
  const [selectedText, setSelectedText] = useState<string>('');
  const selectedTextRef = useLatest(selectedText);
  const [transText, setTransText] = useState<string | null>(null);
  const transTextRef = useLatest(transText);

  const boxRef = useRef<HTMLDivElement>(null);

  const onStream = (content: string) => {
    transTextRef.current = (transTextRef.current || '').concat(content || '');
    setTransText(transTextRef.current);
  };

  const startTrans = () => {
    setTransText('');
  };

  const closeTrans = () => {
    setTransText(null);
    setPosition(null);
  };

  chrome.storage.local.get('apiKey', (result) => {
    setApiKey(result.apiKey);
  });

  const handleMouseUp = (e: MouseEvent) => {
    if (boxRef.current?.contains(e.target as Node)) {
      return;
    }

    const selection = window.getSelection();
    if (selection === null) {
      return;
    }
    const text = selection.toString().trim();

    if (text.length > 0 && text !== selectedTextRef.current) {
      const range = selection.getRangeAt(0).getBoundingClientRect();
      if (range.top < 0) {
        setPosition({
          bottom: window.innerHeight - range.bottom - 28,
          left: range.left + window.scrollX,
        });
      } else {
        setPosition({
          top: range.top - 28,
          left: range.left + window.scrollX,
        });
      }
      setSelectedText(text);
    } else {
      setPosition(null);
      setTransText(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    position && (
      <div ref={boxRef} className={styles.app} style={{ ...position }}>
        {transText !== null ? (
          <TransResult
            text={selectedText}
            onStream={onStream}
            transText={transText}
            closeTrans={closeTrans}
            apiKey={apiKey}
          />
        ) : (
          <Menu text={selectedText} startTrans={startTrans} />
        )}
      </div>
    )
  );
};

export default App;
