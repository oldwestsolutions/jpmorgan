import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@mui/material';
import {
  Speed,
  AutoGraph,
  Psychology,
  RocketLaunch,
  ShowChart,
  SwapHoriz,
  Security,
  Analytics,
  Timeline,
  BarChart,
  TrendingUp,
  AccountBalance,
  ArrowBack,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Platform: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Speed sx={{ fontSize: 32, color: 'secondary.main' }} />,
      title: 'Lightning-Fast Execution',
      description: 'Execute trades in milliseconds with our advanced order routing system',
      details: [
        'Sub-millisecond order execution',
        'Smart order routing',
        'Real-time market data',
        'Advanced order types'
      ]
    },
    {
      icon: <AutoGraph sx={{ fontSize: 32, color: 'secondary.main' }} />,
      title: 'Advanced Technical Analysis',
      description: 'Access over 400 technical indicators and drawing tools for precise market analysis',
      details: [
        'Custom indicator creation',
        'Multiple timeframe analysis',
        'Pattern recognition',
        'Volume profile analysis'
      ]
    },
    {
      icon: <Psychology sx={{ fontSize: 32, color: 'secondary.main' }} />,
      title: 'Algorithmic Trading',
      description: 'Deploy custom algorithms or choose from our library of proven strategies',
      details: [
        'Strategy builder',
        'Backtesting engine',
        'Paper trading',
        'Risk management tools'
      ]
    },
    {
      icon: <RocketLaunch sx={{ fontSize: 32, color: 'secondary.main' }} />,
      title: 'Options & Futures Trading',
      description: 'Trade complex derivatives with confidence using our advanced options chain and futures tools',
      details: [
        'Options chain analysis',
        'Probability calculator',
        'Futures margin calculator',
        'Options strategy builder'
      ]
    }
  ];

  const platformStats = [
    { label: 'Execution Speed', value: '< 1ms', icon: <Speed /> },
    { label: 'Technical Indicators', value: '400+', icon: <ShowChart /> },
    { label: 'Trading Pairs', value: '1000+', icon: <SwapHoriz /> },
    { label: 'Global Markets', value: '50+', icon: <AccountBalance /> },
  ];

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 8 }}>
      {/* Back Button */}
      <Container maxWidth="xl" sx={{ mb: 4 }}>
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

      {/* Hero Section */}
      <Box sx={{ bgcolor: '#111', color: 'white', py: 8, mb: 8 }}>
        <Container maxWidth="xl">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" sx={{ fontWeight: 800, mb: 2 }}>
                Professional Trading Platform
              </Typography>
              <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                Institutional-grade tools and features for serious traders
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ 
                  bgcolor: 'secondary.main',
                  color: '#000',
                  px: 4,
                  py: 1.5,
                  '&:hover': {
                    bgcolor: 'secondary.dark',
                    color: '#000'
                  }
                }}
                onClick={() => navigate('/login')}
              >
                Start Trading
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={{
                  bgcolor: '#181A1B',
                  p: 4,
                  borderRadius: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 3
                }}
              >
                {platformStats.map((stat, index) => (
                  <Box
                    key={stat.label}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      p: 2,
                      bgcolor: '#232425',
                      borderRadius: 2,
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateX(8px)'
                      }
                    }}
                  >
                    <Box sx={{ color: 'secondary.main' }}>{stat.icon}</Box>
                    <Box>
                      <Typography variant="h6" sx={{ color: 'white', fontWeight: 700 }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#999' }}>
                        {stat.label}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="xl" sx={{ mb: 8 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 6, textAlign: 'center' }}>
          Platform Features
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} key={feature.title}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  bgcolor: '#181A1B',
                  borderRadius: 4,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-8px)'
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  {feature.icon}
                  <Typography variant="h5" sx={{ ml: 2, fontWeight: 700, color: 'white' }}>
                    {feature.title}
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ mb: 3, color: '#999' }}>
                  {feature.description}
                </Typography>
                <List>
                  {feature.details.map((detail, idx) => (
                    <ListItem key={idx} sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            bgcolor: 'secondary.main'
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText primary={detail} sx={{ color: '#999' }} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Advanced Tools Section */}
      <Box sx={{ bgcolor: '#111', color: 'white', py: 8 }}>
        <Container maxWidth="xl">
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 6, textAlign: 'center' }}>
            Advanced Trading Tools
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                icon: <Analytics sx={{ fontSize: 40, color: 'secondary.main' }} />,
                title: 'Market Analysis',
                description: 'Comprehensive market analysis tools with real-time data and advanced charting capabilities'
              },
              {
                icon: <Timeline sx={{ fontSize: 40, color: 'secondary.main' }} />,
                title: 'Portfolio Analytics',
                description: 'Track performance, analyze risk, and optimize your portfolio with advanced analytics'
              },
              {
                icon: <BarChart sx={{ fontSize: 40, color: 'secondary.main' }} />,
                title: 'Risk Management',
                description: 'Advanced risk management tools to protect your investments and maximize returns'
              },
              {
                icon: <TrendingUp sx={{ fontSize: 40, color: 'secondary.main' }} />,
                title: 'Performance Tracking',
                description: 'Monitor your trading performance with detailed analytics and reporting tools'
              }
            ].map((tool, index) => (
              <Grid item xs={12} sm={6} md={3} key={tool.title}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    height: '100%',
                    bgcolor: '#181A1B',
                    borderRadius: 4,
                    textAlign: 'center',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.05)'
                    }
                  }}
                >
                  {tool.icon}
                  <Typography variant="h6" sx={{ mt: 2, mb: 1, fontWeight: 700 }}>
                    {tool.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#999' }}>
                    {tool.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 3 }}>
          Ready to Start Trading?
        </Typography>
        <Typography variant="h6" sx={{ mb: 4, color: 'text.secondary' }}>
          Join thousands of traders using our professional platform
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{
            bgcolor: 'secondary.main',
            color: 'white',
            px: 6,
            py: 2,
            fontSize: '1.1rem',
            '&:hover': {
              bgcolor: 'secondary.dark'
            }
          }}
          onClick={() => navigate('/login')}
        >
          Get Started Now
        </Button>
      </Container>
    </Box>
  );
};

export default Platform; 