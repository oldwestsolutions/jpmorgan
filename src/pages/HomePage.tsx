import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Paper,
  Divider,
  Modal,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import {
  ArrowForward,
  Notifications,
  Settings,
  Menu as MenuIcon,
  TrendingUp,
  AccountBalance,
  ShowChart,
  Speed,
  AutoGraph,
  Psychology,
  RocketLaunch,
  SwapHoriz,
  ArrowUpward,
  ArrowDownward,
  Email,
  Store,
  EmojiEvents,
  Insights,
  Newspaper,
  ChevronLeft,
  ChevronRight,
  LinkedIn,
  Twitter,
  YouTube,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { keyframes } from '@emotion/react';
import { useState, useEffect, useRef } from 'react';
import { Link } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';

// Animation keyframes for chart line and candlesticks
const glow = keyframes`
  0% { box-shadow: 0 0 8px #43ea4a44; }
  50% { box-shadow: 0 0 24px #43ea4a99; }
  100% { box-shadow: 0 0 8px #43ea4a44; }
`;
const candlestickGrow = keyframes`
  0% { height: 20px; }
  50% { height: 60px; }
  100% { height: 20px; }
`;
const priceFade = keyframes`
  0% { opacity: 0.5; }
  50% { opacity: 1; }
  100% { opacity: 0.5; }
`;

const carouselFade = keyframes`
  0% { opacity: 0; transform: translateY(30px) scale(0.97); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
`;

const heroCarouselSlides = [
  {
    icon: <Email sx={{ fontSize: 48, color: 'secondary.main', mb: 1 }} />,
    title: 'Pro Newsletter Alerts',
    desc: 'Get real-time earnings alerts, technical signals, and exclusive research delivered to your inbox.'
  },
  {
    icon: <Store sx={{ fontSize: 48, color: 'secondary.main', mb: 1 }} />,
    title: 'Algorithm Marketplace',
    desc: 'Browse, buy, and deploy trading algorithms from top developers. Automate your edge.'
  },
  {
    icon: <EmojiEvents sx={{ fontSize: 48, color: 'secondary.main', mb: 1 }} />,
    title: 'Trading Tournaments',
    desc: 'Compete in public trading tournaments powered by blockchain. Climb the leaderboard and win rewards.'
  },
  {
    icon: <Insights sx={{ fontSize: 48, color: 'secondary.main', mb: 1 }} />,
    title: 'Sentiment & Financial Analysis',
    desc: 'Gauge market sentiment and access advanced financial analytics for smarter trades.'
  },
  {
    icon: <Newspaper sx={{ fontSize: 48, color: 'secondary.main', mb: 1 }} />,
    title: 'News & Research',
    desc: 'Stay ahead with curated news, research, and real-time market updates.'
  }
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [heroIndex, setHeroIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [carouselDirection, setCarouselDirection] = useState<'left' | 'right'>('right');

  // Auto-advance carousel every 10 seconds
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setHeroIndex((i) => (i + 1) % heroCarouselSlides.length);
    }, 10000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [heroIndex]);

  const nextHero = () => {
    setCarouselDirection('right');
    setHeroIndex((i) => (i + 1) % heroCarouselSlides.length);
  };
  const prevHero = () => {
    setCarouselDirection('left');
    setHeroIndex((i) => (i - 1 + heroCarouselSlides.length) % heroCarouselSlides.length);
  };

  // Newsletter modal state
  const [newsletterOpen, setNewsletterOpen] = useState(false);
  const handleNewsletterOpen = () => setNewsletterOpen(true);
  const handleNewsletterClose = () => setNewsletterOpen(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Header with Login button, no hamburger */}
      <AppBar position="static" color="transparent" elevation={0} sx={{ bgcolor: 'transparent', boxShadow: 'none', py: 2 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: { xs: 1, md: 3 } }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              color: 'white',
              letterSpacing: 1,
              fontSize: { xs: 22, md: 28 },
              fontFamily: 'Georgia, serif',
            }}
          >
            RobberBaron
          </Typography>
          
          {/* Search Bar */}
          <Box sx={{ 
            flexGrow: 1, 
            maxWidth: 600, 
            mx: 4,
            display: { xs: 'none', md: 'block' }
          }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search stocks, news, or strategies..."
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: '#222',
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
                '& .MuiInputBase-input': {
                  color: 'white',
                  '&::placeholder': {
                    color: '#888',
                    opacity: 1,
                  },
                },
              }}
            />
          </Box>

          <Button
            variant="outlined"
            color="primary"
            sx={{
              borderColor: '#fff',
              color: '#fff',
              fontWeight: 700,
              borderRadius: 2,
              px: 3,
              py: 1,
              fontSize: { xs: 14, md: 16 },
              borderWidth: 2,
              borderStyle: 'solid',
            }}
            href="/login"
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section with Carousel */}
      <Box
        sx={{
          position: 'relative',
          color: 'white',
          py: { xs: 6, md: 12 },
          overflow: 'hidden',
          background: '#111',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'none',
            zIndex: -1,
          },
        }}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 1, sm: 2, md: 4 } }}>
          <Grid container spacing={4} alignItems="center" direction={{ xs: 'column-reverse', md: 'row' }}>
            <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'left' }, mb: { xs: 4, md: 0 } }}>
              <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 800, fontSize: { xs: 32, md: 54 }, lineHeight: 1.1, color: 'white' }}>
                Trade with Confidence
              </Typography>
              <Typography variant="h5" sx={{ mb: 4, opacity: 0.95, fontSize: { xs: 16, md: 24 }, color: 'white', fontWeight: 400 }}>
                Advanced trading tools and expert insights to help you navigate the markets
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ bgcolor: '#111', color: '#fff', fontWeight: 700, borderRadius: 3, px: 4, py: 1.5, fontSize: { xs: 15, md: 18 }, '&:hover': { bgcolor: '#222', color: '#fff' }, display: 'flex', alignItems: 'center', gap: 1 }}
                  startIcon={<Newspaper sx={{ color: '#fff', fontSize: 22 }} />}
                  onClick={() => navigate('/newsletter')}
                >
                  Newsletter
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ borderColor: '#111', color: '#111', fontWeight: 700, borderRadius: 3, px: 4, py: 1.5, fontSize: { xs: 15, md: 18 }, bgcolor: '#fff', '&:hover': { bgcolor: '#eee', color: '#111', borderColor: '#111' } }}
                >
                  Sign Up
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                position: 'relative',
                height: { xs: '220px', sm: '400px' },
                width: '100%',
                overflow: 'hidden',
                borderRadius: 1,
                bgcolor: '#1a1a1a'
              }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={heroIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    style={{ 
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url(${heroCarouselSlides[heroIndex].icon})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '2rem',
                      textAlign: 'center'
                    }}
                  >
                    <Paper elevation={0} sx={{
                      bgcolor: '#fff',
                      borderRadius: 10,
                      p: { xs: 2, md: 7 },
                      minHeight: { xs: 180, md: 340 },
                      width: '100%',
                      maxWidth: 520,
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 8px 48px #0008, 0 2px 16px #0008',
                      position: 'relative',
                      background: '#fff',
                      border: '1.5px solid #222',
                      '@media (max-width: 600px)': {
                        bgcolor: '#fff',
                        color: '#000',
                        border: '1.5px solid #222',
                        boxShadow: '0 4px 24px #0008'
                      }
                    }}>
                      <Box sx={{ 
                        mb: 2, 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        '@media (max-width: 600px)': {
                          '& svg': {
                            color: '#111 !important'
                          }
                        }
                      }}>
                        {React.cloneElement(heroCarouselSlides[heroIndex].icon, { 
                          color: 'inherit', 
                          sx: { 
                            fontSize: { xs: 40, md: 56 }, 
                            color: '#111',
                            mb: 1,
                            '@media (max-width: 600px)': {
                              color: '#111 !important'
                            }
                          } 
                        })}
                      </Box>
                      <Typography variant="h4" sx={{ 
                        fontWeight: 800, 
                        color: '#000', 
                        mb: 2, 
                        fontSize: { xs: 18, md: 34 },
                        '@media (max-width: 600px)': {
                          color: '#000'
                        }
                      }}>
                        {heroCarouselSlides[heroIndex].title}
                      </Typography>
                      <Typography variant="h6" sx={{ 
                        fontSize: { xs: 12, md: 20 }, 
                        fontWeight: 500, 
                        color: '#000',
                        '@media (max-width: 600px)': {
                          color: '#000'
                        }
                      }}>
                        {heroCarouselSlides[heroIndex].desc}
                      </Typography>
                    </Paper>
                  </motion.div>
                </AnimatePresence>
                <Box sx={{ 
                  position: 'absolute', 
                  bottom: { xs: 8, sm: 16 }, 
                  left: '50%', 
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  gap: 1.5,
                  zIndex: 10
                }}>
                  {heroCarouselSlides.map((_, index) => (
                    <Box
                      key={index}
                      onClick={() => setHeroIndex(index)}
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        bgcolor: heroIndex === index ? '#43ea4a' : 'rgba(255,255,255,0.8)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 0 8px rgba(0,0,0,0.3)',
                        '&:hover': {
                          bgcolor: heroIndex === index ? '#43ea4a' : 'rgba(255,255,255,1)',
                          transform: 'scale(1.1)'
                        }
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Newsletter Modal with Paywall */}
      <Dialog open={newsletterOpen} onClose={handleNewsletterClose} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 800, fontFamily: 'Georgia, serif', color: '#111', textAlign: 'center', pt: 4 }}>
          RobberBaron Newsletter
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center', pb: 2 }}>
          <Typography variant="h6" sx={{ color: '#111', fontWeight: 700, mb: 2 }}>
            Premium Trading Alerts
          </Typography>
          <Typography variant="body1" sx={{ color: '#222', mb: 2 }}>
            Get real-time email alerts for <b>Bollinger Bands</b>, <b>RSI</b>, and more—directly to your inbox. Use these signals to trade smarter with Robinhood or any broker.
          </Typography>
          <Typography variant="body2" sx={{ color: '#555', mb: 3 }}>
            <b>This is a paid feature.</b> Subscribe to unlock advanced analytics, premium signals, and exclusive research. Cancel anytime.
          </Typography>
          <TextField
            label="Email address"
            type="email"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            InputProps={{ style: { color: '#111', background: '#f5f5f5' } }}
            InputLabelProps={{ style: { color: '#888' } }}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button variant="contained" color="primary" sx={{ bgcolor: '#111', color: '#fff', fontWeight: 700, borderRadius: 2, px: 4, py: 1.5, '&:hover': { bgcolor: '#222', color: '#fff' } }}>
            Subscribe
          </Button>
          <Button variant="outlined" color="primary" onClick={handleNewsletterClose} sx={{ borderColor: '#111', color: '#111', fontWeight: 700, borderRadius: 2, px: 4, py: 1.5, bgcolor: '#fff', '&:hover': { bgcolor: '#eee', color: '#111', borderColor: '#111' } }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Advanced Trading Benefits Section */}
      <Box sx={{ py: 8, bgcolor: 'background.default' }}>
        <Container maxWidth="xl">
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
                Trade with Precision
              </Typography>
              <Typography variant="h6" color="text.secondary" paragraph>
                Experience lightning-fast execution with our state-of-the-art trading platform
              </Typography>
              <Box sx={{ mt: 4 }}>
                {[
                  {
                    icon: <Speed sx={{ fontSize: 32, color: 'secondary.main' }} />,
                    title: 'Lightning-Fast Execution',
                    description: 'Execute trades in milliseconds with our advanced order routing system',
                  },
                  {
                    icon: <AutoGraph sx={{ fontSize: 32, color: 'secondary.main' }} />,
                    title: 'Advanced Technical Analysis',
                    description: 'Access over 400 technical indicators and drawing tools for precise market analysis',
                  },
                  {
                    icon: <Psychology sx={{ fontSize: 32, color: 'secondary.main' }} />,
                    title: 'Algorithmic Trading',
                    description: 'Deploy custom algorithms or choose from our library of proven strategies',
                  },
                  {
                    icon: <RocketLaunch sx={{ fontSize: 32, color: 'secondary.main' }} />,
                    title: 'Options & Futures Trading',
                    description: 'Trade complex derivatives with confidence using our advanced options chain and futures tools',
                  },
                ].map((benefit, index) => (
                  <Box key={index} sx={{ mb: 4 }}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item>
                        {benefit.icon}
                      </Grid>
                      <Grid item xs>
                        <Typography variant="h6" gutterBottom>
                          {benefit.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          {benefit.description}
                        </Typography>
                      </Grid>
                    </Grid>
                    {index < 3 && <Divider sx={{ mt: 3 }} />}
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ position: 'relative', height: '100%' }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: '100%',
                    background: 'linear-gradient(145deg, rgba(27, 77, 62, 0.1) 0%, rgba(13, 43, 30, 0.2) 100%)',
                    borderRadius: 4,
                  }}
                >
                  <Typography variant="h5" gutterBottom color="secondary.main">
                    Platform Highlights
                  </Typography>
                  <Box sx={{ mt: 3 }}>
                    {[
                      'Real-time market data and Level II quotes',
                      'Advanced options chain with probability analysis',
                      'Customizable trading algorithms',
                      'Futures trading with real-time margin requirements',
                      'Advanced charting with multiple timeframes',
                      'Automated trading strategies',
                      'Risk management tools',
                      'Portfolio analytics and reporting',
                    ].map((feature, index) => (
                      <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            bgcolor: 'secondary.main',
                            mr: 2,
                          }}
                        />
                        <Typography variant="body1">{feature}</Typography>
                      </Box>
                    ))}
                  </Box>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    endIcon={<ArrowForward />}
                    onClick={() => navigate('/legend')}
                    sx={{ mt: 4 }}
                  >
                    Explore Platform
                  </Button>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Professional Trading Environment Section (Screenshot Style) */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Grid container spacing={6} alignItems="flex-start">
          {/* Left Column */}
          <Grid item xs={12} md={6}>
            <Typography variant="h3" sx={{ fontWeight: 700, color: 'white', mb: 1 }}>
              Professional Trading Environment
            </Typography>
            <Box sx={{ width: 60, height: 4, bgcolor: 'secondary.main', borderRadius: 2, mb: 4 }} />
            <Typography variant="h4" sx={{ fontWeight: 700, color: 'white', mb: 2 }}>
              Institutional-Quality Trading Experience
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Our platform delivers the power and functionality typically reserved for professional trading floors, with intuitive design that caters to traders of all experience levels.
            </Typography>
            {/* Cards */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Paper elevation={0} sx={{ bgcolor: '#181A1B', p: 3, borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <SwapHoriz sx={{ color: 'secondary.main', mr: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'white' }}>
                    Precision Execution
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Execute trades with institutional-grade speed and reliability, capitalizing on time-sensitive opportunities identified by our AI systems
                </Typography>
              </Paper>
              <Paper elevation={0} sx={{ bgcolor: '#181A1B', p: 3, borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <ShowChart sx={{ color: 'secondary.main', mr: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'white' }}>
                    Advanced Visualization
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Professional-grade charting and data visualization tools that transform complex signals into clear, actionable intelligence
                </Typography>
              </Paper>
              <Paper elevation={0} sx={{ bgcolor: '#181A1B', p: 3, borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Psychology sx={{ color: 'secondary.main', mr: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'white' }}>
                    Enterprise Integration
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Seamlessly connect with your existing trading infrastructure through our robust API services, enabling automated execution at institutional scale
                </Typography>
              </Paper>
            </Box>
          </Grid>
          {/* Right Column: Enhanced Dashboard Card with Animations */}
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ bgcolor: '#181A1B', borderRadius: 2, p: 0, minHeight: 420, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              {/* Dashboard Header */}
              <Box sx={{ bgcolor: '#232425', px: 3, py: 2, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
                <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 700 }}>
                  RobberBaron Intelligence Dashboard
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flex: 1, minHeight: 340 }}>
                {/* Main Chart Area */}
                <Box sx={{ flex: 2, p: 3, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRight: '1px solid #232425' }}>
                  {/* Mock Chart with Animation */}
                  <Box sx={{ mb: 2, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Box sx={{ width: '100%', height: 120, bgcolor: '#202322', borderRadius: 2, position: 'relative', overflow: 'hidden', mb: 2 }}>
                      {/* Simulated chart lines with glow */}
                      <Box sx={{ position: 'absolute', left: 0, right: 0, top: '60%', height: 2, bgcolor: 'rgba(67,234,74,0.2)', animation: `${glow} 2s infinite` }} />
                      <Box sx={{ position: 'absolute', left: 0, right: 0, top: '40%', height: 2, bgcolor: 'rgba(233,67,67,0.2)' }} />
                      <Box sx={{ position: 'absolute', left: '10%', width: '80%', height: 2, bgcolor: 'linear-gradient(90deg, #43ea4a 0%, #e94343 100%)', background: 'linear-gradient(90deg, #43ea4a 0%, #e94343 100%)', top: '50%', animation: `${glow} 1.5s infinite` }} />
                      {/* Simulated animated candlesticks */}
                      {[...Array(12)].map((_, i) => (
                        <Box key={i} sx={{
                          position: 'absolute',
                          left: `${8 + i * 7}%`,
                          bottom: 10,
                          width: 6,
                          height: `${30 + Math.round(Math.random() * 40)}px`,
                          bgcolor: i % 2 === 0 ? '#43ea4a' : '#e94343',
                          borderRadius: 1,
                          opacity: 0.7,
                          animation: `${candlestickGrow} 2s ${i * 0.1}s infinite`
                        }} />
                      ))}
                    </Box>
                  </Box>
                  {/* Watchlist with animated price changes */}
                  <Box>
                    <Typography variant="body2" sx={{ color: 'white', fontWeight: 600, mb: 1 }}>
                      Watchlist
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {[
                        { symbol: 'AAPL', price: 192.34, change: '+1.23%', up: true },
                        { symbol: 'TSLA', price: 812.12, change: '-0.87%', up: false },
                        { symbol: 'NVDA', price: 712.45, change: '+2.11%', up: true },
                        { symbol: 'AMZN', price: 134.56, change: '-0.45%', up: false },
                        { symbol: 'META', price: 312.78, change: '+0.98%', up: true },
                      ].map((item, i) => (
                        <Box key={i} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 1, py: 0.5, borderRadius: 1, bgcolor: '#202322', animation: `${priceFade} 2s ${i * 0.2}s infinite` }}>
                          <Typography variant="body2" sx={{ color: 'white', fontWeight: 500 }}>{item.symbol}</Typography>
                          <Typography variant="body2" sx={{ color: 'white', fontWeight: 400 }}>{item.price}</Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', color: item.up ? '#43ea4a' : '#e94343', fontWeight: 600 }}>
                            {item.up ? <ArrowUpward sx={{ fontSize: 16, mr: 0.5 }} /> : <ArrowDownward sx={{ fontSize: 16, mr: 0.5 }} />}
                            {item.change}
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                  <Button variant="outlined" color="secondary" size="small" sx={{ mt: 2, alignSelf: 'flex-end' }}>
                    View Interactive
                  </Button>
                </Box>
                {/* Sidebar Stats with hover effect */}
                <Box sx={{ flex: 1, p: 3, display: 'flex', flexDirection: 'column', gap: 2, minWidth: 120 }}>
                  {[
                    { label: 'Account Equity', value: '$128,400', color: '#43ea4a' },
                    { label: 'PnL (Today)', value: '+$2,340', color: '#43ea4a' },
                    { label: 'Buying Power', value: '$54,000', color: '#43ea4a' },
                    { label: 'Open Orders', value: '3', color: '#e94343' },
                  ].map((stat, idx) => (
                    <Paper
                      key={stat.label}
                      elevation={0}
                      sx={{
                        bgcolor: '#232425',
                        borderRadius: 2,
                        p: 2,
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        '&:hover': {
                          transform: 'scale(1.04)',
                          boxShadow: `0 0 16px ${stat.color}44`,
                        },
                      }}
                    >
                      <Typography variant="body2" sx={{ color: stat.color, fontWeight: 700 }}>
                        {stat.label}
                      </Typography>
                      <Typography variant="h6" sx={{ color: 'white', fontWeight: 700 }}>
                        {stat.value}
                      </Typography>
                    </Paper>
                  ))}
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Newsletter/Mailing List Section */}
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper elevation={0} sx={{ bgcolor: '#181A1B', borderRadius: 3, p: { xs: 3, md: 6 }, textAlign: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
            <Email sx={{ fontSize: 48, color: 'secondary.main', mb: 1 }} />
            <Typography variant="h4" sx={{ fontWeight: 700, color: 'white', mb: 1 }}>
              Get Pro Trading Alerts & Insights
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500 }}>
              Subscribe to our newsletter for real-time earnings alerts, advanced technical signals, and exclusive research:
            </Typography>
          </Box>
          <Grid container spacing={3} justifyContent="center" sx={{ mb: 3 }}>
            {[
              { label: 'Earnings Alerts', desc: 'Never miss a key earnings event with instant notifications.' },
              { label: 'Bollinger Bands', desc: 'Get volatility signals and breakout alerts.' },
              { label: 'Monte Carlo Simulations', desc: 'See probability-based forecasts for your trades.' },
              { label: 'Moving Averages', desc: 'Spot trends and reversals with dynamic MA signals.' },
              { label: 'RSI Alerts', desc: 'Identify overbought/oversold conditions instantly.' },
            ].map((item, i) => (
              <Grid item xs={12} sm={6} key={item.label}>
                <Paper elevation={0} sx={{ bgcolor: '#232425', borderRadius: 2, p: 2, height: '100%' }}>
                  <Typography variant="h6" sx={{ color: 'secondary.main', fontWeight: 700, mb: 0.5 }}>{item.label}</Typography>
                  <Typography variant="body2" color="text.secondary">{item.desc}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <input type="email" placeholder="Your email address" style={{
              padding: '12px 16px',
              borderRadius: 6,
              border: 'none',
              outline: 'none',
              fontSize: 16,
              marginRight: 12,
              background: '#232425',
              color: 'white',
              width: 260,
              boxShadow: '0 0 0 1px #232425',
              transition: 'box-shadow 0.2s',
            }} />
            <Button variant="contained" color="secondary" size="large" sx={{ px: 4, py: 1.5, fontWeight: 700 }}>
              Subscribe
            </Button>
          </Box>
        </Paper>
      </Container>

      {/* Footer */}
      <Box sx={{ bgcolor: '#111', color: 'white', py: 6, mt: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, fontFamily: 'Georgia, serif' }}>
                RobberBaron
              </Typography>
              <Typography variant="body2" sx={{ color: '#999', mb: 2 }}>
                Advanced trading tools and expert insights to help you navigate the markets with confidence.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <IconButton sx={{ color: '#999', '&:hover': { color: 'white' } }}>
                  <LinkedIn />
                </IconButton>
                <IconButton sx={{ color: '#999', '&:hover': { color: 'white' } }}>
                  <Twitter />
                </IconButton>
                <IconButton sx={{ color: '#999', '&:hover': { color: 'white' } }}>
                  <YouTube />
                </IconButton>
              </Box>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 700 }}>Platform</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Link href="/legend" sx={{ color: '#999', textDecoration: 'none', '&:hover': { color: 'white' } }}>Legend</Link>
                <Link href="/newsletter" sx={{ color: '#999', textDecoration: 'none', '&:hover': { color: 'white' } }}>Newsletter</Link>
                <Link href="/news" sx={{ color: '#999', textDecoration: 'none', '&:hover': { color: 'white' } }}>News</Link>
                <Link href="/login" sx={{ color: '#999', textDecoration: 'none', '&:hover': { color: 'white' } }}>Login</Link>
              </Box>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 700 }}>Resources</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Link href="#" sx={{ color: '#999', textDecoration: 'none', '&:hover': { color: 'white' } }}>Documentation</Link>
                <Link href="#" sx={{ color: '#999', textDecoration: 'none', '&:hover': { color: 'white' } }}>API</Link>
                <Link href="#" sx={{ color: '#999', textDecoration: 'none', '&:hover': { color: 'white' } }}>Support</Link>
                <Link href="#" sx={{ color: '#999', textDecoration: 'none', '&:hover': { color: 'white' } }}>Status</Link>
              </Box>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 700 }}>Company</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Link href="#" sx={{ color: '#999', textDecoration: 'none', '&:hover': { color: 'white' } }}>About</Link>
                <Link href="#" sx={{ color: '#999', textDecoration: 'none', '&:hover': { color: 'white' } }}>Careers</Link>
                <Link href="#" sx={{ color: '#999', textDecoration: 'none', '&:hover': { color: 'white' } }}>Contact</Link>
                <Link href="#" sx={{ color: '#999', textDecoration: 'none', '&:hover': { color: 'white' } }}>Legal</Link>
              </Box>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4, borderColor: '#333' }} />
          <Typography variant="body2" sx={{ color: '#666', textAlign: 'center' }}>
            © 2024 RobberBaron. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage; 