import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ModalSupportProvider, SocketProvider } from './hook/useContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ModalSupportProvider>
        <SocketProvider>
            <App />
        </SocketProvider>
    </ModalSupportProvider>,
);

reportWebVitals();
