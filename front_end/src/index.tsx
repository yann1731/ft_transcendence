import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ResponsiveAppBar from './Components/ToolBar'
import DividerStack from './Components/Divider';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@mui/system';
import { theme } from './Theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ThemeProvider theme={theme}>
    <div>
      <ResponsiveAppBar />
      <br></br>
      <DividerStack />
    </div>
    </ThemeProvider>  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
