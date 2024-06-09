import { createRoot } from 'react-dom/client';
import App from './app';

const div = document.createElement('div');
div.id = 'gpt-translate';
document.documentElement.append(div);

createRoot(div).render(<App></App>);
