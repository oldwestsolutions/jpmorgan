import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  useTheme,
  useMediaQuery,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowBack } from '@mui/icons-material';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add signup logic here
    navigate('/legend');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ 
        minHeight: '100vh', 
        bgcolor: '#121212',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Box sx={{ 
          p: 2, 
          borderBottom: '1px solid #333',
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              fontSize: { xs: '1rem', sm: '1.25rem' },
              cursor: 'pointer',
              '&:hover': { color: '#bbb' },
              fontFamily: 'Georgia, serif',
              fontWeight: 700,
              color: '#fff'
            }}
            onClick={handleLogoClick}
          >
            Robber Baron
          </Typography>
        </Box>
        <Container 
          component="main" 
          maxWidth="xs" 
          sx={{ 
            flex: 1,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            pt: { xs: 4, sm: 8 }
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ width: '100%' }}
          >
            <Paper 
              elevation={3} 
              sx={{ 
                p: { xs: 2, sm: 4 }, 
                width: '100%',
                bgcolor: '#1a1a1a',
                color: 'white',
                border: '1px solid #333'
              }}
            >
              <Typography 
                component="h1" 
                variant="h5" 
                sx={{ 
                  mb: 3, 
                  textAlign: 'center',
                  fontWeight: 600
                }}
              >
                Create Account
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  autoComplete="given-name"
                  autoFocus
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      '& fieldset': { borderColor: '#333' },
                      '&:hover fieldset': { borderColor: '#666' },
                      '&.Mui-focused fieldset': { borderColor: '#666' }
                    },
                    '& .MuiInputLabel-root': { color: 'text.secondary' }
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      '& fieldset': { borderColor: '#333' },
                      '&:hover fieldset': { borderColor: '#666' },
                      '&.Mui-focused fieldset': { borderColor: '#666' }
                    },
                    '& .MuiInputLabel-root': { color: 'text.secondary' }
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      '& fieldset': { borderColor: '#333' },
                      '&:hover fieldset': { borderColor: '#666' },
                      '&.Mui-focused fieldset': { borderColor: '#666' }
                    },
                    '& .MuiInputLabel-root': { color: 'text.secondary' }
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      '& fieldset': { borderColor: '#333' },
                      '&:hover fieldset': { borderColor: '#666' },
                      '&.Mui-focused fieldset': { borderColor: '#666' }
                    },
                    '& .MuiInputLabel-root': { color: 'text.secondary' }
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      '& fieldset': { borderColor: '#333' },
                      '&:hover fieldset': { borderColor: '#666' },
                      '&.Mui-focused fieldset': { borderColor: '#666' }
                    },
                    '& .MuiInputLabel-root': { color: 'text.secondary' }
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ 
                    mt: 3, 
                    mb: 2,
                    bgcolor: '#fff',
                    color: '#000',
                    '&:hover': { bgcolor: '#eee' }
                  }}
                >
                  Sign Up
                </Button>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                    Already have an account?
                  </Typography>
                  <Link 
                    component="button"
                    variant="body2" 
                    onClick={handleLoginClick}
                    sx={{ 
                      color: '#fff',
                      '&:hover': { color: '#bbb' },
                      border: 'none',
                      background: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Sign In
                  </Link>
                </Box>
              </Box>
            </Paper>
          </motion.div>
        </Container>
      </Box>
    </motion.div>
  );
};

export default SignUp; 