import React from 'react';                  // React lets you write components
import ReactDOM from 'react-dom/client';    // This renders your app to the page
import App from './App';                    // This is your main component
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));  // Finds <div id="root">
root.render(
  <React.StrictMode>
    <App />         
  </React.StrictMode>
);
