import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
  Avatar,
  Menu,
  MenuItem,
  Button,
  TextField,
  Chip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  ShowChart,
  AccountBalance,
  Notifications,
  Settings,
  ExitToApp,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Timeline,
  Assessment,
  AccountCircle,
  Mail,
  MenuBook,
  Timeline as TimelineIcon,
  Article,
  AutoStories,
  Delete,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const DRAWER_WIDTH = 240;

const Legend: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<'main' | 'bio' | 'options' | 'news' | 'price'>('main');
  const [isLegendView, setIsLegendView] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Add logout logic here
    navigate('/login');
  };

  const drawer = (
    <Box sx={{ 
      bgcolor: '#1a1a1a', 
      height: '100%',
      color: 'white',
      borderRight: '1px solid #333'
    }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        p: 2,
        borderBottom: '1px solid #333'
      }}>
        <Typography variant="h6" sx={{ 
          fontFamily: 'Georgia, serif',
          fontWeight: 700,
          color: '#fff'
        }}>
          RobberBaron
        </Typography>
      </Box>
      <List>
        <ListItem button sx={{ 
          bgcolor: '#2a2a2a',
          '&:hover': { bgcolor: '#333' }
        }}>
          <ListItemIcon>
            <DashboardIcon sx={{ color: '#43ea4a' }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button sx={{ 
          '&:hover': { bgcolor: '#333' }
        }}>
          <ListItemIcon>
            <ShowChart sx={{ color: '#43ea4a' }} />
          </ListItemIcon>
          <ListItemText primary="Trading" />
        </ListItem>
        <ListItem button sx={{ 
          '&:hover': { bgcolor: '#333' }
        }}>
          <ListItemIcon>
            <AccountBalance sx={{ color: '#43ea4a' }} />
          </ListItemIcon>
          <ListItemText primary="Portfolio" />
        </ListItem>
        <ListItem button sx={{ 
          '&:hover': { bgcolor: '#333' }
        }}>
          <ListItemIcon>
            <Notifications sx={{ color: '#43ea4a' }} />
          </ListItemIcon>
          <ListItemText primary="Alerts" />
        </ListItem>
        <ListItem button sx={{ 
          '&:hover': { bgcolor: '#333' }
        }}>
          <ListItemIcon>
            <Settings sx={{ color: '#43ea4a' }} />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </Box>
  );

  const mainContentHeight = 'calc(100vh - 64px)'; // 64px for AppBar

  const [searchResults, setSearchResults] = useState<Array<{
    title: string;
    description: string;
    price?: string;
    icon: React.ReactNode;
  }>>([]);
  const [selectedStock, setSelectedStock] = useState<{
    title: string;
    description: string;
    price?: string;
    change?: string;
    volume?: string;
    marketCap?: string;
  } | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMailOpen, setIsMailOpen] = useState(false);
  const [mailAnchorEl, setMailAnchorEl] = useState<null | HTMLElement>(null);
  const [isMailboxFull, setIsMailboxFull] = useState(false);
  const [isComposing, setIsComposing] = useState(false);

  // Sample messages for preview
  const sampleMessages = [
    { id: 1, subject: 'Market Update', preview: 'Latest market trends and analysis...', time: '2m ago', unread: true },
    { id: 2, subject: 'Portfolio Alert', preview: 'Your portfolio has reached a new milestone...', time: '15m ago', unread: true },
    { id: 3, subject: 'Trading Opportunity', preview: 'New trading opportunity detected...', time: '1h ago', unread: false },
  ];

  const handleSearch = (query: string) => {
    if (query.toLowerCase() === 'netflix') {
      setSearchResults([
        { 
          title: 'Netflix, Inc.', 
          description: '**Netflix** is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices. Founded in 1997, Netflix has grown to become one of the world\'s leading entertainment companies with over 200 million paid memberships in over 190 countries.', 
          price: '$500.00',
          icon: <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix Logo" style={{ width: 24, height: 24 }} />
        }
      ]);
      setIsSearchOpen(true);
      // Prevent zoom on mobile
      if (isMobile) {
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
          viewport.setAttribute('content', 'width=device-width, initial-scale=0.9, maximum-scale=0.9');
        }
      }
    } else {
      setSearchResults([]);
      setIsSearchOpen(false);
    }
  };

  const handleClickAway = () => {
    setIsSearchOpen(false);
    setSearchResults([]);
  };

  // Add useEffect for click away handling
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isSearchOpen && !(event.target as Element).closest('.search-container')) {
        handleClickAway();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchOpen]);

  const handleStockClick = (stock: { title: string; description: string; price?: string }) => {
    setSelectedStock(stock);
    setSearchResults([]);
    setIsSearchOpen(false);
    // Reset viewport zoom
    if (isMobile) {
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=0.9');
      }
    }
  };

  const handleBackToAccount = () => {
    setSelectedStock(null);
  };

  const handleViewChange = (view: 'main' | 'bio' | 'options' | 'news' | 'price') => {
    setCurrentView(view);
  };

  const handleMailClick = (event: React.MouseEvent<HTMLElement>) => {
    setMailAnchorEl(event.currentTarget);
    setIsMailOpen(true);
  };

  const handleMailClose = () => {
    setIsMailOpen(false);
    setMailAnchorEl(null);
  };

  const handleMailboxToggle = () => {
    setIsMailboxFull(!isMailboxFull);
    handleMailClose();
  };

  const handleComposeClick = () => {
    setIsComposing(true);
    handleMailClose();
  };

  const handleLegendToggle = () => {
    if (isLegendView) {
      setIsLegendView(false);
      setSelectedStock(null);
    } else {
      setIsLegendView(true);
    }
  };

  const handleLogoClick = () => {
    setSelectedStock(null);
    setIsLegendView(false);
  };

  const renderBioView = () => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      <Paper sx={{ p: 2, bgcolor: '#1a1a1a', color: 'white', border: '1px solid #333' }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Netflix Biography</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ p: 2, bgcolor: '#2a2a2a', borderRadius: 1, border: '1px solid #333' }}>
              <Typography variant="h6" sx={{ mb: 1 }}>Company Overview</Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                Netflix, Inc. is an American subscription streaming service and production company. Launched on August 29, 1997, it offers a film and television series library through distribution deals as well as its own productions, known as Netflix Originals.
              </Typography>
              <Typography variant="body1" color="text.secondary">
                The company's primary business is its subscription-based streaming service which offers online streaming of a library of films and television programs, including those produced in-house. As of 2024, Netflix has over 200 million paid memberships in over 190 countries.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ p: 2, bgcolor: '#2a2a2a', borderRadius: 1, border: '1px solid #333' }}>
              <Typography variant="h6" sx={{ mb: 1 }}>Leadership</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ p: 1, bgcolor: '#333', borderRadius: 1 }}>
                  <Typography variant="subtitle1" sx={{ color: '#43ea4a' }}>Reed Hastings</Typography>
                  <Typography variant="body2" color="text.secondary">Co-Founder & Co-CEO</Typography>
                </Box>
                <Box sx={{ p: 1, bgcolor: '#333', borderRadius: 1 }}>
                  <Typography variant="subtitle1" sx={{ color: '#43ea4a' }}>Ted Sarandos</Typography>
                  <Typography variant="body2" color="text.secondary">Co-CEO</Typography>
                </Box>
                <Box sx={{ p: 1, bgcolor: '#333', borderRadius: 1 }}>
                  <Typography variant="subtitle1" sx={{ color: '#43ea4a' }}>Greg Peters</Typography>
                  <Typography variant="body2" color="text.secondary">COO & CPO</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ p: 2, bgcolor: '#2a2a2a', borderRadius: 1, border: '1px solid #333' }}>
              <Typography variant="h6" sx={{ mb: 1 }}>Key Statistics</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ p: 1.5, bgcolor: '#333', borderRadius: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary">Market Cap</Typography>
                    <Typography variant="h6" sx={{ color: '#43ea4a' }}>$250B</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ p: 1.5, bgcolor: '#333', borderRadius: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary">Revenue (2023)</Typography>
                    <Typography variant="h6" sx={{ color: '#43ea4a' }}>$33.7B</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ p: 1.5, bgcolor: '#333', borderRadius: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary">Subscribers</Typography>
                    <Typography variant="h6" sx={{ color: '#43ea4a' }}>200M+</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ p: 1.5, bgcolor: '#333', borderRadius: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary">Employees</Typography>
                    <Typography variant="h6" sx={{ color: '#43ea4a' }}>12,000+</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </motion.div>
  );

  const renderOptionsView = () => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      <Paper sx={{ 
        p: 2, 
        bgcolor: '#1a1a1a', 
        color: 'white', 
        border: '1px solid #333',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5">Options Chain</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              select
              size="small"
              defaultValue="2024-05-17"
              sx={{ 
                bgcolor: '#2a2a2a', 
                borderRadius: 1,
                '& .MuiOutlinedInput-root': { color: 'white' },
                width: 150
              }}
            >
              <MenuItem value="2024-05-17">May 17, 2024</MenuItem>
              <MenuItem value="2024-06-21">June 21, 2024</MenuItem>
              <MenuItem value="2024-07-19">July 19, 2024</MenuItem>
            </TextField>
            <TextField
              select
              size="small"
              defaultValue="500"
              sx={{ 
                bgcolor: '#2a2a2a', 
                borderRadius: 1,
                '& .MuiOutlinedInput-root': { color: 'white' },
                width: 120
              }}
            >
              <MenuItem value="500">$500</MenuItem>
              <MenuItem value="550">$550</MenuItem>
              <MenuItem value="600">$600</MenuItem>
            </TextField>
          </Box>
        </Box>
        {isMobile ? (
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ 
              display: 'flex', 
              gap: 1, 
              mb: 1,
              overflowX: 'auto',
              pb: 1,
              '&::-webkit-scrollbar': { height: 4 },
              '&::-webkit-scrollbar-track': { bgcolor: '#1a1a1a' },
              '&::-webkit-scrollbar-thumb': { bgcolor: '#333', borderRadius: 2 }
            }}>
              {['Calls', 'Puts'].map((type) => (
                <Chip
                  key={type}
                  label={type}
                  sx={{
                    bgcolor: type === 'Calls' ? '#43ea4a' : '#ff4444',
                    color: '#000',
                    fontWeight: 600,
                    minWidth: 80
                  }}
                />
              ))}
            </Box>
            <Box sx={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              flex: 1,
              overflow: 'auto'
            }}>
              {[500, 550, 600, 650, 700].map((strike) => (
                <Box
                  key={strike}
                  sx={{
                    p: 1.5,
                    bgcolor: '#2a2a2a',
                    borderRadius: 1,
                    border: '1px solid #333',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    '&:hover': {
                      borderColor: '#43ea4a',
                      transform: 'translateY(-1px)',
                      transition: 'all 0.2s'
                    }
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2">${strike}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date().toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="subtitle2" color="#43ea4a">
                        ${(strike * 0.1).toFixed(2)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Call
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="subtitle2" color="#ff4444">
                        ${(strike * 0.08).toFixed(2)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Put
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 2, bgcolor: '#2a2a2a', borderRadius: 1, border: '1px solid #333' }}>
                <Typography variant="h6" sx={{ mb: 1, color: '#43ea4a' }}>Call Options</Typography>
                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(5, 1fr)',
                  gap: 1,
                  mb: 1,
                  p: 1,
                  bgcolor: '#333',
                  borderRadius: 1
                }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>Strike</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>Bid</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>Ask</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>Volume</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>OI</Typography>
                </Box>
                {[500, 550, 600, 650, 700].map((strike) => (
                  <Box key={strike} sx={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(5, 1fr)',
                    gap: 1,
                    p: 1,
                    '&:hover': { 
                      bgcolor: '#333',
                      transform: 'translateY(-1px)',
                      transition: 'all 0.2s'
                    },
                    cursor: 'pointer'
                  }}>
                    <Typography variant="body2">${strike}</Typography>
                    <Typography variant="body2" color="#43ea4a">${(strike * 0.1).toFixed(2)}</Typography>
                    <Typography variant="body2" color="#ff4444">${(strike * 0.11).toFixed(2)}</Typography>
                    <Typography variant="body2">{(Math.random() * 1000).toFixed(0)}</Typography>
                    <Typography variant="body2">{(Math.random() * 5000).toFixed(0)}</Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 2, bgcolor: '#2a2a2a', borderRadius: 1, border: '1px solid #333' }}>
                <Typography variant="h6" sx={{ mb: 1, color: '#ff4444' }}>Put Options</Typography>
                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(5, 1fr)',
                  gap: 1,
                  mb: 1,
                  p: 1,
                  bgcolor: '#333',
                  borderRadius: 1
                }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>Strike</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>Bid</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>Ask</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>Volume</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>OI</Typography>
                </Box>
                {[500, 550, 600, 650, 700].map((strike) => (
                  <Box key={strike} sx={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(5, 1fr)',
                    gap: 1,
                    p: 1,
                    '&:hover': { 
                      bgcolor: '#333',
                      transform: 'translateY(-1px)',
                      transition: 'all 0.2s'
                    },
                    cursor: 'pointer'
                  }}>
                    <Typography variant="body2">${strike}</Typography>
                    <Typography variant="body2" color="#43ea4a">${(strike * 0.08).toFixed(2)}</Typography>
                    <Typography variant="body2" color="#ff4444">${(strike * 0.09).toFixed(2)}</Typography>
                    <Typography variant="body2">{(Math.random() * 1000).toFixed(0)}</Typography>
                    <Typography variant="body2">{(Math.random() * 5000).toFixed(0)}</Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ p: 2, bgcolor: '#2a2a2a', borderRadius: 1, border: '1px solid #333' }}>
                <Typography variant="h6" sx={{ mb: 1 }}>Options Analysis</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ p: 2, bgcolor: '#333', borderRadius: 1 }}>
                      <Typography variant="subtitle2" color="text.secondary">Implied Volatility</Typography>
                      <Typography variant="h6" color="#43ea4a">32.5%</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ p: 2, bgcolor: '#333', borderRadius: 1 }}>
                      <Typography variant="subtitle2" color="text.secondary">Put/Call Ratio</Typography>
                      <Typography variant="h6" color="#ff4444">0.85</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ p: 2, bgcolor: '#333', borderRadius: 1 }}>
                      <Typography variant="subtitle2" color="text.secondary">Max Pain</Typography>
                      <Typography variant="h6" color="#43ea4a">$550</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        )}
      </Paper>
    </motion.div>
  );

  const renderNewsView = () => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      <Paper sx={{ p: 2, bgcolor: '#1a1a1a', color: 'white', border: '1px solid #333' }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Latest News</Typography>
        <Grid container spacing={2}>
          {/* Featured Article */}
          <Grid item xs={12}>
            <Box 
              sx={{ 
                p: 2, 
                bgcolor: '#2a2a2a', 
                borderRadius: 1, 
                border: '1px solid #333',
                position: 'relative',
                overflow: 'hidden',
                height: 300,
                '&:hover': { transform: 'scale(1.01)', transition: 'transform 0.2s' }
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url("https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1074&q=80")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  zIndex: 0
                }}
              />
              <Box sx={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>Netflix Announces Major Content Strategy Shift</Typography>
                <Typography variant="subtitle1" sx={{ mb: 2, color: '#43ea4a' }}>May 10, 2024 • 5 min read</Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Netflix reveals plans to double down on original content production while exploring new revenue streams through gaming and merchandise...
                </Typography>
                <Button variant="contained" sx={{ alignSelf: 'flex-start', bgcolor: '#43ea4a', color: '#000', '&:hover': { bgcolor: '#2fc437' } }}>
                  Read More
                </Button>
              </Box>
            </Box>
          </Grid>
          
          {/* Secondary Articles */}
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 2, bgcolor: '#2a2a2a', borderRadius: 1, border: '1px solid #333', height: '100%' }}>
              <Typography variant="h6" sx={{ mb: 1 }}>Netflix Stock Surges on Strong Q1 Earnings</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>May 9, 2024 • 3 min read</Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                Netflix shares jumped 8% after reporting better-than-expected subscriber growth and revenue...
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Chip label="Earnings" size="small" sx={{ bgcolor: '#333', color: '#43ea4a' }} />
                <Chip label="Stock" size="small" sx={{ bgcolor: '#333', color: '#43ea4a' }} />
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 2, bgcolor: '#2a2a2a', borderRadius: 1, border: '1px solid #333', height: '100%' }}>
              <Typography variant="h6" sx={{ mb: 1 }}>New Original Series Breaks Viewing Records</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>May 8, 2024 • 4 min read</Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                Netflix's latest original series has become the platform's most-watched show in its first week...
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Chip label="Content" size="small" sx={{ bgcolor: '#333', color: '#43ea4a' }} />
                <Chip label="Entertainment" size="small" sx={{ bgcolor: '#333', color: '#43ea4a' }} />
              </Box>
            </Box>
          </Grid>
          
          {/* Additional Articles */}
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 2, bgcolor: '#2a2a2a', borderRadius: 1, border: '1px solid #333' }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>Netflix Expands Gaming Division</Typography>
              <Typography variant="body2" color="text.secondary">May 7, 2024</Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 2, bgcolor: '#2a2a2a', borderRadius: 1, border: '1px solid #333' }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>New Partnership with Major Studio</Typography>
              <Typography variant="body2" color="text.secondary">May 6, 2024</Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 2, bgcolor: '#2a2a2a', borderRadius: 1, border: '1px solid #333' }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>International Expansion Plans</Typography>
              <Typography variant="body2" color="text.secondary">May 5, 2024</Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </motion.div>
  );

  const renderPriceView = () => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      <Paper sx={{ 
        p: 2, 
        bgcolor: '#1a1a1a', 
        color: 'white', 
        border: '1px solid #333',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Stock Price Analysis</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ p: 2, bgcolor: '#2a2a2a', borderRadius: 1, border: '1px solid #333' }}>
              <Typography variant="h6" sx={{ mb: 1 }}>Price History</Typography>
              <Box sx={{ 
                height: 300, 
                bgcolor: '#333', 
                borderRadius: 1, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                <Typography variant="body1" color="text.secondary">Price Chart Placeholder</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 2, bgcolor: '#2a2a2a', borderRadius: 1, border: '1px solid #333' }}>
              <Typography variant="h6" sx={{ mb: 1 }}>Key Metrics</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box sx={{ p: 1.5, bgcolor: '#333', borderRadius: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary">Current Price</Typography>
                    <Typography variant="h6" sx={{ color: '#43ea4a' }}>$500.00</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ p: 1.5, bgcolor: '#333', borderRadius: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary">52W High</Typography>
                    <Typography variant="h6" sx={{ color: '#43ea4a' }}>$550.00</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ p: 1.5, bgcolor: '#333', borderRadius: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary">52W Low</Typography>
                    <Typography variant="h6" sx={{ color: '#ff4444' }}>$450.00</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ p: 1.5, bgcolor: '#333', borderRadius: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary">Volume</Typography>
                    <Typography variant="h6" sx={{ color: '#43ea4a' }}>2.5M</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 2, bgcolor: '#2a2a2a', borderRadius: 1, border: '1px solid #333' }}>
              <Typography variant="h6" sx={{ mb: 1 }}>Technical Indicators</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box sx={{ p: 1.5, bgcolor: '#333', borderRadius: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary">RSI (14)</Typography>
                    <Typography variant="h6" sx={{ color: '#43ea4a' }}>65.2</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ p: 1.5, bgcolor: '#333', borderRadius: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary">MACD</Typography>
                    <Typography variant="h6" sx={{ color: '#43ea4a' }}>Bullish</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ p: 1.5, bgcolor: '#333', borderRadius: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary">Moving Avg (50)</Typography>
                    <Typography variant="h6" sx={{ color: '#43ea4a' }}>$495.00</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ p: 1.5, bgcolor: '#333', borderRadius: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary">Moving Avg (200)</Typography>
                    <Typography variant="h6" sx={{ color: '#43ea4a' }}>$485.00</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </motion.div>
  );

  const renderMobileView = () => (
    <Box sx={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      p: 1
    }}>
      <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, fontSize: '1.1rem' }}>
        Robinhood Style View
      </Typography>
      <Box sx={{ mb: 1 }}>
        <Typography variant="h5" sx={{ color: '#43ea4a', fontWeight: 700, fontSize: '1.5rem' }}>$1,234,567.89</Typography>
        <Typography variant="body2" color="text.secondary">Total Account Value</Typography>
      </Box>
      <Box sx={{ 
        flex: 1,
        bgcolor: '#2a2a2a', 
        borderRadius: 1, 
        border: '1px solid #333', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        mb: 1 
      }}>
        <Typography variant="body2" color="text.secondary">Graph Placeholder</Typography>
      </Box>
      <Box sx={{ 
        display: 'flex', 
        gap: 0.5, 
        mb: 1, 
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {['Daily', 'Weekly', 'Monthly', 'YTD', 'Year', '5Y'].map((period) => (
          <Button 
            key={period} 
            variant="outlined" 
            size="small"
            sx={{ 
              color: 'white', 
              borderColor: '#333', 
              '&:hover': { borderColor: '#43ea4a' },
              fontSize: '0.75rem',
              py: 0.5,
              px: 1
            }}
          >
            {period}
          </Button>
        ))}
      </Box>
    </Box>
  );

  const renderSearchResults = () => (
    <Box sx={{ mt: 2 }}>
      {searchResults.map((result, index) => (
        <Paper
          key={index}
          sx={{
            p: 2,
            mb: 2,
            bgcolor: '#1a1a1a',
            color: 'white',
            border: '1px solid #333',
            cursor: 'pointer',
            '&:hover': { bgcolor: '#222' }
          }}
          onClick={() => handleStockClick(result)}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ 
              width: 40, 
              height: 40, 
              bgcolor: '#333', 
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {result.icon}
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'white' }}>
                {result.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                {result.description}
              </Typography>
              {result.title === 'Netflix' && (
                <Box sx={{ mt: 1, pt: 1, borderTop: '1px solid #333' }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    <strong>Founded:</strong> 1997
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    <strong>CEO:</strong> Ted Sarandos
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    <strong>Headquarters:</strong> Los Gatos, California
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    <strong>Business Model:</strong> Subscription-based streaming service
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    <strong>Key Products:</strong> Netflix Streaming, Netflix DVD, Netflix Games
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Paper>
      ))}
    </Box>
  );

  const renderMailDropdown = () => (
    <Menu
      anchorEl={mailAnchorEl}
      open={isMailOpen}
      onClose={handleMailClose}
      PaperProps={{
        sx: {
          bgcolor: '#1a1a1a',
          color: 'white',
          mt: 1.5,
          width: 320,
          maxHeight: 400,
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          '& .MuiMenuItem-root': {
            fontSize: '0.875rem',
            '&:hover': {
              bgcolor: '#2a2a2a'
            }
          }
        }
      }}
    >
      <Box sx={{ p: 1, borderBottom: '1px solid #333' }}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<Mail />}
          onClick={handleComposeClick}
          sx={{
            bgcolor: '#43ea4a',
            color: '#000',
            '&:hover': { bgcolor: '#2fc437' },
            mb: 1
          }}
        >
          Compose
        </Button>
      </Box>
      <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
        {sampleMessages.map((message) => (
          <MenuItem
            key={message.id}
            sx={{
              display: 'block',
              p: 1.5,
              borderBottom: '1px solid #333',
              '&:last-child': { borderBottom: 'none' }
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: message.unread ? 600 : 400,
                  color: message.unread ? '#fff' : 'text.secondary'
                }}
              >
                {message.subject}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {message.time}
              </Typography>
            </Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: '0.75rem',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {message.preview}
            </Typography>
          </MenuItem>
        ))}
      </Box>
      <Divider sx={{ bgcolor: '#333' }} />
      <MenuItem onClick={handleMailboxToggle}>
        {isMailboxFull ? 'Empty Mailbox' : 'View Full Mailbox'}
      </MenuItem>
      <MenuItem onClick={handleMailClose}>Close</MenuItem>
    </Menu>
  );

  const renderComposeMessage = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      style={{ height: '100%' }}
    >
      <Paper sx={{ 
        p: 2, 
        bgcolor: '#1a1a1a', 
        color: 'white', 
        border: '1px solid #333',
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Compose Message</Typography>
          <IconButton onClick={() => setIsComposing(false)} size="small">
            <ExitToApp sx={{ color: '#43ea4a' }} />
          </IconButton>
        </Box>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="To"
            variant="outlined"
            size="small"
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                color: 'white',
                '& fieldset': { borderColor: '#333' },
                '&:hover fieldset': { borderColor: '#43ea4a' },
                '&.Mui-focused fieldset': { borderColor: '#43ea4a' }
              },
              '& .MuiInputLabel-root': { color: 'text.secondary' }
            }}
          />
          <TextField
            label="Subject"
            variant="outlined"
            size="small"
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                color: 'white',
                '& fieldset': { borderColor: '#333' },
                '&:hover fieldset': { borderColor: '#43ea4a' },
                '&.Mui-focused fieldset': { borderColor: '#43ea4a' }
              },
              '& .MuiInputLabel-root': { color: 'text.secondary' }
            }}
          />
          <TextField
            label="Message"
            variant="outlined"
            multiline
            rows={8}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                color: 'white',
                '& fieldset': { borderColor: '#333' },
                '&:hover fieldset': { borderColor: '#43ea4a' },
                '&.Mui-focused fieldset': { borderColor: '#43ea4a' }
              },
              '& .MuiInputLabel-root': { color: 'text.secondary' }
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button
              variant="outlined"
              onClick={() => setIsComposing(false)}
              sx={{
                color: 'white',
                borderColor: '#333',
                '&:hover': { borderColor: '#43ea4a' }
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{
                bgcolor: '#43ea4a',
                color: '#000',
                '&:hover': { bgcolor: '#2fc437' }
              }}
            >
              Send
            </Button>
          </Box>
        </Box>
      </Paper>
    </motion.div>
  );

  const renderMailbox = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      style={{ height: '100%' }}
    >
      <Paper sx={{ 
        p: 2, 
        bgcolor: '#1a1a1a', 
        color: 'white', 
        border: '1px solid #333',
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Mailbox</Typography>
          <IconButton onClick={handleMailboxToggle} size="small">
            <ExitToApp sx={{ color: '#43ea4a' }} />
          </IconButton>
        </Box>
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          {isMailboxFull ? (
            Array.from({ length: 20 }).map((_, index) => (
              <Box 
                key={index}
                sx={{ 
                  p: 2, 
                  mb: 1, 
                  bgcolor: '#2a2a2a', 
                  borderRadius: 1,
                  border: '1px solid #333'
                }}
              >
                <Typography variant="subtitle2" sx={{ mb: 1 }}>Important Update #{index + 1}</Typography>
                <Typography variant="body2" color="text.secondary">
                  This is a sample message to demonstrate the mailbox functionality...
                </Typography>
              </Box>
            ))
          ) : (
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              height: '100%',
              color: 'text.secondary'
            }}>
              <Mail sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
              <Typography variant="body1">Your mailbox is empty</Typography>
            </Box>
          )}
        </Box>
      </Paper>
    </motion.div>
  );

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#111', minHeight: '100vh', color: 'white' }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Top Section: Graph */}
        <Grid container spacing={4} sx={{ mb: 4 }}>
          <Grid item xs={12} md={8}>
            <Paper elevation={0} sx={{ 
              bgcolor: '#181A1B', 
              borderRadius: 2, 
              p: 3,
              height: '400px',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {selectedStock?.title || 'Select a Stock'}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button 
                    variant="outlined" 
                    size="small"
                    sx={{ 
                      borderColor: '#333',
                      color: 'white',
                      '&:hover': { borderColor: '#666' }
                    }}
                  >
                    1D
                  </Button>
                  <Button 
                    variant="outlined" 
                    size="small"
                    sx={{ 
                      borderColor: '#333',
                      color: 'white',
                      '&:hover': { borderColor: '#666' }
                    }}
                  >
                    1W
                  </Button>
                  <Button 
                    variant="outlined" 
                    size="small"
                    sx={{ 
                      borderColor: '#333',
                      color: 'white',
                      '&:hover': { borderColor: '#666' }
                    }}
                  >
                    1M
                  </Button>
                </Box>
              </Box>
              <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="body1" color="text.secondary">
                  {selectedStock ? 'Chart will be displayed here' : 'Select a stock to view chart'}
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ 
              bgcolor: '#181A1B', 
              borderRadius: 2, 
              p: 3,
              height: '400px',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Stock Details
              </Typography>
              {selectedStock ? (
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Price:</strong> ${selectedStock.price}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Change:</strong> {selectedStock.change}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Volume:</strong> {selectedStock.volume}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Market Cap:</strong> {selectedStock.marketCap}
                  </Typography>
                </Box>
              ) : (
                <Typography variant="body1" color="text.secondary">
                  Select a stock to view details
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>

        {/* Bottom Section: Alert Settings */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper elevation={0} sx={{ 
              bgcolor: '#181A1B', 
              borderRadius: 2, 
              p: 3
            }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                Alert Settings
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Price Alert"
                    type="number"
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'white',
                        '& fieldset': { borderColor: '#333' },
                        '&:hover fieldset': { borderColor: '#666' },
                        '&.Mui-focused fieldset': { borderColor: '#888' }
                      },
                      '& .MuiInputLabel-root': { color: '#888' }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Volume Alert"
                    type="number"
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'white',
                        '& fieldset': { borderColor: '#333' },
                        '&:hover fieldset': { borderColor: '#666' },
                        '&.Mui-focused fieldset': { borderColor: '#888' }
                      },
                      '& .MuiInputLabel-root': { color: '#888' }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email for Alerts"
                    type="email"
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'white',
                        '& fieldset': { borderColor: '#333' },
                        '&:hover fieldset': { borderColor: '#666' },
                        '&.Mui-focused fieldset': { borderColor: '#888' }
                      },
                      '& .MuiInputLabel-root': { color: '#888' }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button 
                    variant="contained" 
                    fullWidth
                    sx={{ 
                      bgcolor: '#43ea4a',
                      color: '#000',
                      '&:hover': { bgcolor: '#2fc437' }
                    }}
                  >
                    Set Alert
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ 
              bgcolor: '#181A1B', 
              borderRadius: 2, 
              p: 3
            }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                Active Alerts
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  { type: 'Price', value: '$150.00', condition: 'Above' },
                  { type: 'Volume', value: '1M', condition: 'Below' },
                  { type: 'RSI', value: '70', condition: 'Above' }
                ].map((alert, index) => (
                  <Box key={index} sx={{ 
                    p: 2, 
                    bgcolor: '#232425', 
                    borderRadius: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <Box>
                      <Typography variant="body2" sx={{ color: '#888' }}>
                        {alert.type}
                      </Typography>
                      <Typography variant="body1">
                        {alert.condition} {alert.value}
                      </Typography>
                    </Box>
                    <IconButton size="small" sx={{ color: '#666' }}>
                      <Delete />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Legend; 