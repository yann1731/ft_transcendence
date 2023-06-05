import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/system';
import { theme } from './Theme';
import { BrowserRouter } from 'react-router-dom';
import App from './Components/App';
import './App.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <div>
        <App></App>
      </div>
      </ThemeProvider> 
    </BrowserRouter>
);

