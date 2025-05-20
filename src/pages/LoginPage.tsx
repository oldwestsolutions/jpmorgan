import React from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Link,
  IconButton,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      bgcolor: 'background.default',
      color: 'white'
    }}>
      {/* Back Button */}
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <IconButton 
          onClick={() => navigate('/')}
          sx={{ 
            color: 'white',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.1)'
            }
          }}
        >
          <ArrowBack />
        </IconButton>
      </Container>

      <Container maxWidth="sm" sx={{ flex: 1, display: 'flex', alignItems: 'center', py: 8 }}>
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            width: '100%',
            bgcolor: '#181A1B',
            borderRadius: 4
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, textAlign: 'center', mb: 4, color: 'white' }}>
            Welcome to General Exchange
          </Typography>
          
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'white',
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
                  color: '#888',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#888',
                }
              }}
            />
            
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'white',
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
                  color: '#888',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#888',
                }
              }}
            />

            <Button
              variant="contained"
              size="large"
              fullWidth
              sx={{
                bgcolor: 'secondary.main',
                color: '#000',
                py: 1.5,
                '&:hover': {
                  bgcolor: 'secondary.dark',
                  color: '#000'
                }
              }}
            >
              Login
            </Button>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" sx={{ color: '#888' }}>
                Don't have an account?{' '}
                <Link 
                  href="/signup" 
                  sx={{ 
                    color: 'secondary.main',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  Sign up
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage; 