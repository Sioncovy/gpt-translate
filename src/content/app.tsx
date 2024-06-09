import { useEffect, useState } from 'react';
import styles from './app.module.less';
import Menu from './components/Menu';

const App = () => {
  const [position, setPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const [selectedText, setSelectedText] = useState<string>('');

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
        <Menu text={selectedText} />
      </div>
    )
  );
};

export default App;
