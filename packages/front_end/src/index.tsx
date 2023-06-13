import React from "react";
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/system';
import { theme } from './Theme';
import { BrowserRouter } from 'react-router-dom';
import App from './Components/App';
import './App.css';
import { store } from "./store/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <div>
        <App />
      </div>
    </Provider> 
    </BrowserRouter>
);

