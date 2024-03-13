import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import store from './Store/store';
// redux persist
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from 'redux-persist'
// redux persist end


const root = ReactDOM.createRoot(document.getElementById('root'));
// redux persist code
let persistor = persistStore(store);
// redux persist code
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>

        {/* wrap redux persist gat */}
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
        {/* wrap redux persist gat */}

      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
