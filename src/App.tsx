import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Legend from './pages/Legend';
import LoginPage from './pages/LoginPage';
import Newsletter from './pages/Newsletter';
import News from './pages/News';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#111', // Black
      light: '#222',
      dark: '#000',
      contrastText: '#fff',
    },
    secondary: {
      main: '#fff', // White
      light: '#eee',
      dark: '#bbb',
      contrastText: '#111',
    },
    background: {
      default: '#111',
      paper: '#181818',
    },
    text: {
      primary: '#fff',
      secondary: '#bbb',
      disabled: '#888',
    },
    divider: '#222',
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0,0,0,0.12)',
          background: 'linear-gradient(145deg, #181818 0%, #111 100%)',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/legend" element={<Legend />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/newsletter" element={<Newsletter />} />
          <Route path="/news" element={<News />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App; 