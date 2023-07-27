import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';


import axios from 'axios'; 

const domNode = document.getElementById('root');
const root = createRoot(domNode);

axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001"; 

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

