import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';
import theme from './theme.tsx';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, ThemeOptions } from '@mui/material/';
import { BrowserRouter } from 'react-router';
import axios from 'axios';

// axios.defaults.baseURL = `${import.meta.env.VITE_API_BASE_URL}`;
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

const mainTheme = createTheme(theme as ThemeOptions);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={mainTheme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
