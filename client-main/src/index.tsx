import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// Pass the 'name' prop to the App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
