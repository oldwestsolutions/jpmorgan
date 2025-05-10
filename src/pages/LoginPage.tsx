import React from 'react';
import { Box, Button, Container, Paper, TextField, Typography, Link } from '@mui/material';

const LoginPage: React.FC = () => {
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
          <Box component="form" noValidate autoComplete="off" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              required
              InputProps={{ style: { color: 'white', background: '#222' } }}
              InputLabelProps={{ style: { color: '#bbb' } }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              InputProps={{ style: { color: 'white', background: '#222' } }}
              InputLabelProps={{ style: { color: '#bbb' } }}
            />
            <Button
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