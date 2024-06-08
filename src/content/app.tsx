import { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    document.addEventListener('mouseup', () => {
      const selection = window.getSelection();
      if (selection === null) {
        return;
      }
      const text = selection.toString().trim();

      if (text.length > 0) {
        const range = selection.getRangeAt(0).getBoundingClientRect();
        console.log('✨  ~ document.addEventListener ~ range:', range);
        // setButtonPosition({
        //   top: range.top + window.scrollY - 30, // Adjust position as needed
        //   left: range.left + window.scrollX,
        // });
        // setSelectedText(text);
      } else {
        // setButtonPosition(null)
      }
    });
  }, []);
  return <div>App</div>;
};

export default App;
