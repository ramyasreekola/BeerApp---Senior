import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './router';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@emotion/react';
import { theme } from './styles/theme';
import './styles/global.css';
import { FavouritesProvider } from './contexts/FavouritesContext';
import * as serviceWorker from './services/service-worker'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <FavouritesProvider>
        <Router />
      </FavouritesProvider>
    </ThemeProvider>
  </React.StrictMode>
);

serviceWorker.register();