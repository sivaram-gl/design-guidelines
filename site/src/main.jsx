import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import App from './App.jsx';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#66BBFF', dark: '#3A9AE8', light: '#E8F0FC', contrastText: '#0B1220' },
    secondary: { main: '#FFCC80' },
    background: { default: '#121212', paper: '#1B1B1B' },
    text: { primary: '#FFFFFF', secondary: 'rgba(255,255,255,0.70)' },
    divider: 'rgba(255,255,255,0.12)'
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
