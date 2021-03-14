import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import './index.css';
import App from './App';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: '#fed8b1',
      main: '#FFA500',
      dark: '#fdad5c',
      contrastText: '#fff',
    },
    secondary: {
      light: '#90EE90',
      main: '#5cb85c',
      dark: '#006400',
      contrastText: '#fff',
    },
  },
  typography: {
    fontSize: 13,
  },
});

const app = (
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
