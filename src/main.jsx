import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { PersistGate } from "redux-persist/integration/react";
import { configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from './app/rootReducer.jsx';
import './index.css'
import { Provider } from 'react-redux';


const persistConfig = {
  key: "root",
  storage,
};
const persistReducers = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: {
      persistReducers,
  },
  devTools: true,
  middleware: []
})
const persistor = persistStore(store)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store = {store}>
      <PersistGate loading = {null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
