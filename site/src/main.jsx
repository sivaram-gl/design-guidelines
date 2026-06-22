import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import App from './App.jsx';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#196AE5', dark: '#0F4089', light: '#4788EA', contrastText: '#FFFFFF' },
    secondary: { main: '#FF9800' },
    background: { default: '#FAFAFA', paper: '#FFFFFF' },
    text: { primary: 'rgba(33,33,33,0.92)', secondary: 'rgba(33,33,33,0.72)' }
  },
  typography: {
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
    h1: { fontSize: 32, fontWeight: 600, letterSpacing: '-0.4px', lineHeight: 1.125 },
    h2: { fontSize: 28, fontWeight: 600, letterSpacing: '-0.4px', lineHeight: 1.2 },
    h3: { fontSize: 24, fontWeight: 600, letterSpacing: '-0.4px' },
    h4: { fontSize: 20, fontWeight: 600, letterSpacing: '-0.4px' },
    h5: { fontSize: 18, fontWeight: 600, letterSpacing: '-0.4px' },
    subtitle1: { fontSize: 16, fontWeight: 500, letterSpacing: '-0.4px' },
    body1: { fontSize: 16, lineHeight: 1.5 },
    body2: { fontSize: 14, lineHeight: 1.43 },
    button: { textTransform: 'uppercase', fontWeight: 500, letterSpacing: '0.4px' }
  },
  shape: { borderRadius: 8 },
  components: {
    MuiCard: { defaultProps: { variant: 'outlined' }, styleOverrides: { root: { boxShadow: 'none' } } },
    MuiPaper: { defaultProps: { elevation: 0 } },
    MuiButton: { defaultProps: { disableElevation: true } }
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);
