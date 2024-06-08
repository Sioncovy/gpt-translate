import { useEffect } from 'react';

console.log('popup loaded');

const Popup = () => {
  const handleMouseUp = (event: MouseEvent) => {
    console.log('✨  ~ handleMouseUp ~ event:', event);
    const selection = window.getSelection();
    if (selection === null) {
      return;
    }
    console.log('✨  ~ handleMouseUp ~ selection:', selection);
    const text = selection.toString().trim();
    console.log('text', text);

    if (text.length > 0) {
      // const range = selection.getRangeAt(0).getBoundingClientRect();
      // setButtonPosition({
      //   top: range.top + window.scrollY - 30, // Adjust position as needed
      //   left: range.left + window.scrollX,
      // });
      // setSelectedText(text);
    } else {
      // setButtonPosition(null)
    }
  };
  console.log('加载了 popup');

  useEffect(() => {
    console.log('加载了 popup');

    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      console.log('卸载了 popup');
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div>
      <h1>Popup2</h1>
      <p>Popup content</p>
      <footer>哈哈</footer>
    </div>
  );
};

export default Popup;
