import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Clear any cached data that might be causing issues
if (window.location.pathname.includes('/Harmonia')) {
  console.log('Redirecting from /Harmonia to /');
  window.history.replaceState(null, '', '/');
}

// Clear localStorage if needed for debugging
// localStorage.clear();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 