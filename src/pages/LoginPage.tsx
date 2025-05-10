import React from 'react';
import { Box, Button, Container, Paper, TextField, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Allow any credentials to login
    console.log('Login submitted, navigating to /legend');
    navigate('/legend');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Container maxWidth="xs">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 4, bgcolor: '#181818', boxShadow: '0 8px 32px #0008', color: 'white' }}>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, color: 'white', fontFamily: 'Georgia, serif', textAlign: 'center' }}>
            RobberBaron
          </Typography>
          <Typography variant="h6" sx={{ mb: 3, color: 'white', textAlign: 'center' }}>
            Login to your account
          </Typography>
          <Box component="form" onSubmit={handleLogin} noValidate autoComplete="off" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  bgcolor: '#222',
                  '& fieldset': {
                    borderColor: '#444',
                  },
                  '&:hover fieldset': {
                    borderColor: '#666',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#888',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#bbb',
                },
              }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  bgcolor: '#222',
                  '& fieldset': {
                    borderColor: '#444',
                  },
                  '&:hover fieldset': {
                    borderColor: '#666',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#888',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#bbb',
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ bgcolor: '#fff', color: '#111', fontWeight: 700, borderRadius: 2, py: 1.5, mt: 1, '&:hover': { bgcolor: '#eee', color: '#111' } }}
            >
              Login
            </Button>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Link href="#" underline="hover" sx={{ color: '#bbb', fontSize: 14 }}>
              Forgot password?
            </Link>
            <Link href="#" underline="hover" sx={{ color: '#bbb', fontSize: 14 }}>
              Sign up
            </Link>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage; 