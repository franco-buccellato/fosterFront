import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Suspense } from 'react';
import Loader from './components/Loader/Loader';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Suspense fallback={Loader}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Suspense>
);

reportWebVitals();