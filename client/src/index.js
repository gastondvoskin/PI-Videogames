import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';


import axios from 'axios';  /* new */
// import * as dotenv from "dotenv";    /* new */
// dotenv.config();     /* new */
// import "dotenv/config";      /* new */


const domNode = document.getElementById('root');
const root = createRoot(domNode);

axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001";   /* new */
// console.log('process.env: ', process.env);
// console.log('process.env.REACT_APP_API: ', process.env.REACT_APP_API);      // undefined
// console.log('process.env.REACT_APP_API || "http://localhost:3001" : ', process.env.REACT_APP_API || "http://localhost:3001");           // http://localhost:3001

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

