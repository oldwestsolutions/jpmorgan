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
  const [selectedStock, setSelectedStock] = useState<{ title: string; description: string; price?: string } | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMailOpen, setIsMailOpen] = useState(false);
  const [mailAnchorEl, setMailAnchorEl] = useState<null | HTMLElement>(null);
  const [isMailboxFull, setIsMailboxFull] = useState(false);
  const [isComposing, setIsComposing] = useState(false);

  const mockSearchResults = [
    {
      symbol: 'NFLX',
      name: 'Netflix, Inc.',
      price: 612.45,
      change: '+2.34%',
      description: 'Global streaming entertainment service with 260M+ paid memberships in 190+ countries.',
      sector: 'Communication Services',
      industry: 'Entertainment'
    },
    // ... other results ...
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
                <Typography variant="h4" sx={{ mb: 1, fontWeight: 700, color: '#fff' }}>Netflix Announces Major Content Strategy Shift</Typography>
                <Typography variant="subtitle1" sx={{ mb: 2, color: '#43ea4a' }}>May 10, 2024 • 5 min read</Typography>
                <Typography variant="body1" sx={{ mb: 2, color: '#fff' }}>
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
              <Typography variant="h6" sx={{ mb: 1, color: '#fff' }}>Netflix Stock Surges on Strong Q1 Earnings</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>May 9, 2024 • 3 min read</Typography>
              <Typography variant="body1" sx={{ mb: 2, color: '#fff' }}>
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
              <Typography variant="h6" sx={{ mb: 1, color: '#fff' }}>New Original Series Breaks Viewing Records</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>May 8, 2024 • 4 min read</Typography>
              <Typography variant="body1" sx={{ mb: 2, color: '#fff' }}>
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
        {mockSearchResults.map((result, index) => (
          <MenuItem
            key={index}
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
                  fontWeight: 600,
                  color: 'text.secondary'
                }}
              >
                {result.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {result.price}
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
              {result.description}
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ 
        height: '100vh', 
        bgcolor: '#121212', 
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column'
      }}>
        <AppBar
          position="fixed"
          sx={{
            width: '100%',
            bgcolor: '#1a1a1a',
            borderBottom: '1px solid #333',
            zIndex: 1200
          }}
        >
          <Toolbar sx={{ minHeight: { xs: 56, sm: 64 } }}>
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                flexGrow: 1, 
                fontSize: { xs: '1rem', sm: '1.25rem' },
                cursor: 'pointer',
                '&:hover': { color: '#43ea4a' }
              }}
              onClick={handleLogoClick}
            >
              Legend
            </Typography>
            <Box sx={{ position: 'relative', mr: 1 }} className="search-container">
              <TextField
                placeholder="Search..."
                variant="outlined"
                size="small"
                sx={{ 
                  bgcolor: '#2a2a2a', 
                  borderRadius: 1, 
                  '& .MuiOutlinedInput-root': { 
                    color: 'white',
                    fontSize: { xs: '0.875rem', sm: '1rem' }
                  },
                  width: { xs: 150, sm: 200 }
                }}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <AnimatePresence>
                {isSearchOpen && searchResults.length > 0 && renderSearchResults()}
              </AnimatePresence>
            </Box>
            <IconButton
              size="small"
              edge="end"
              onClick={handleProfileMenuOpen}
              color="inherit"
              sx={{ ml: 0.5 }}
            >
              <AccountCircle sx={{ fontSize: { xs: 24, sm: 28 } }} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleProfileMenuClose}
              sx={{
                '& .MuiPaper-root': {
                  bgcolor: '#1a1a1a',
                  color: 'white',
                  mt: 1.5,
                }
              }}
            >
              <MenuItem onClick={handleProfileMenuClose}>Settings</MenuItem>
              <Divider sx={{ bgcolor: '#333' }} />
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
            <IconButton
              size="small"
              edge="end"
              color="inherit"
              sx={{ ml: 0.5 }}
              onClick={handleMailClick}
            >
              <Mail sx={{ fontSize: { xs: 24, sm: 28 } }} />
            </IconButton>
            <IconButton
              size="small"
              edge="end"
              color="inherit"
              sx={{ 
                ml: 0.5,
                color: isLegendView ? '#43ea4a' : 'inherit',
                '&:hover': { color: '#43ea4a' }
              }}
              onClick={handleLegendToggle}
            >
              <AutoStories sx={{ fontSize: { xs: 24, sm: 28 } }} />
            </IconButton>
            {isComposing ? (
              renderComposeMessage()
            ) : renderMailDropdown()}
          </Toolbar>
        </AppBar>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 1, sm: 2 },
            mt: { xs: '56px', sm: '64px' },
            mb: { xs: 1, sm: 2 },
            height: { xs: 'calc(100vh - 64px)', sm: 'calc(100vh - 72px)' },
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}
        >
          {isComposing ? (
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {renderComposeMessage()}
            </Box>
          ) : isMailboxFull ? (
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {renderMailbox()}
            </Box>
          ) : isLegendView ? (
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Paper sx={{ 
                p: { xs: 1, sm: 2 }, 
                bgcolor: '#1a1a1a', 
                color: 'white', 
                border: '1px solid #333', 
                flex: 1, 
                minHeight: 0, 
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Legend Views</Typography>
                <Grid container spacing={2}>
                  {['Bio', 'Options', 'News'].map((view) => (
                    <Grid item xs={12} sm={4} key={view}>
                      <Box 
                        sx={{ 
                          p: 2, 
                          bgcolor: '#2a2a2a', 
                          borderRadius: 1, 
                          border: '1px solid #333',
                          cursor: 'pointer',
                          '&:hover': { 
                            borderColor: '#43ea4a',
                            transform: 'translateY(-2px)',
                            transition: 'all 0.2s'
                          }
                        }}
                        onClick={() => {
                          if (selectedStock) {
                            handleViewChange(view.toLowerCase() as 'bio' | 'options' | 'news');
                          }
                        }}
                      >
                        <Typography variant="h6" sx={{ mb: 1, color: '#43ea4a' }}>{view}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {view === 'Bio' ? 'Company Information' : 
                           view === 'Options' ? 'Trading Options' : 
                           'Latest News & Updates'}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Box>
          ) : (
            selectedStock ? (
              <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Paper sx={{ 
                  p: { xs: 1, sm: 2 }, 
                  bgcolor: '#1a1a1a', 
                  color: 'white', 
                  border: '1px solid #333', 
                  flex: 1, 
                  minHeight: 0, 
                  overflow: 'auto',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <Button 
                    variant="outlined" 
                    onClick={handleBackToAccount} 
                    size="small"
                    sx={{ 
                      mb: 2, 
                      color: 'white', 
                      borderColor: '#333', 
                      '&:hover': { borderColor: '#43ea4a' },
                      fontSize: { xs: '0.75rem', sm: '0.875rem' }
                    }}
                  >
                    Back to Account
                  </Button>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box 
                        component="img"
                        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" 
                        alt="Netflix Logo" 
                        sx={{ 
                          mr: 1,
                          height: { xs: 24, sm: 30 }
                        }}
                      />
                      <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                        {selectedStock.title}
                      </Typography>
                    </Box>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 1,
                        cursor: 'pointer',
                        '&:hover': { opacity: 0.8 }
                      }}
                      onClick={() => handleViewChange('price')}
                    >
                      <Typography variant="h6" sx={{ color: '#43ea4a', fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                        $500.00
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#43ea4a', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                        +2.5%
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>{selectedStock.description}</Typography>
                  <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                    <IconButton 
                      onClick={() => handleViewChange('bio')}
                      sx={{ 
                        color: 'white', 
                        '&:hover': { color: '#43ea4a' },
                        padding: { xs: 0.5, sm: 1 }
                      }}
                    >
                      <MenuBook sx={{ fontSize: { xs: 20, sm: 24 } }} />
                    </IconButton>
                    <IconButton 
                      onClick={() => handleViewChange('options')}
                      sx={{ 
                        color: 'white', 
                        '&:hover': { color: '#43ea4a' },
                        padding: { xs: 0.5, sm: 1 }
                      }}
                    >
                      <TimelineIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
                    </IconButton>
                    <IconButton 
                      onClick={() => handleViewChange('news')}
                      sx={{ 
                        color: 'white', 
                        '&:hover': { color: '#43ea4a' },
                        padding: { xs: 0.5, sm: 1 }
                      }}
                    >
                      <Article sx={{ fontSize: { xs: 20, sm: 24 } }} />
                    </IconButton>
                  </Box>
                  <AnimatePresence mode="wait">
                    {currentView === 'main' && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Grid container spacing={{ xs: 1, sm: 2 }} sx={{ mt: 2 }}>
                          <Grid item xs={12} sm={6}>
                            <Box sx={{ p: { xs: 1, sm: 2 }, bgcolor: '#2a2a2a', borderRadius: 1, border: '1px solid #333' }}>
                              <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' } }}>Stock Price Graph</Typography>
                              <Box sx={{ height: { xs: 150, sm: 200 }, bgcolor: '#2a2a2a', borderRadius: 1, border: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="body2" color="text.secondary">Graph Placeholder</Typography>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Box sx={{ p: { xs: 1, sm: 2 }, bgcolor: '#2a2a2a', borderRadius: 1, border: '1px solid #333' }}>
                              <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' } }}>Options Greeks</Typography>
                              <Grid container spacing={1}>
                                {[
                                  { label: 'Delta', value: '0.65' },
                                  { label: 'Gamma', value: '0.02' },
                                  { label: 'Theta', value: '-0.05' },
                                  { label: 'Vega', value: '0.10' },
                                  { label: 'Rho', value: '0.01' },
                                  { label: 'Open Interest', value: '1000' }
                                ].map((greek) => (
                                  <Grid item xs={6} key={greek.label}>
                                    <Box sx={{ p: 1, bgcolor: '#333', borderRadius: 1, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                                        {greek.label}: {greek.value}
                                      </Typography>
                                    </Box>
                                  </Grid>
                                ))}
                              </Grid>
                              <Button 
                                variant="outlined" 
                                size="small"
                                sx={{ 
                                  mt: 2, 
                                  color: 'white', 
                                  borderColor: '#333', 
                                  '&:hover': { borderColor: '#43ea4a' },
                                  fontSize: { xs: '0.75rem', sm: '0.875rem' }
                                }}
                              >
                                View Contracts for Sale
                              </Button>
                            </Box>
                          </Grid>
                        </Grid>
                      </motion.div>
                    )}
                    {currentView === 'bio' && renderBioView()}
                    {currentView === 'options' && renderOptionsView()}
                    {currentView === 'news' && renderNewsView()}
                    {currentView === 'price' && renderPriceView()}
                  </AnimatePresence>
                </Paper>
              </Box>
            ) : (
              <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Paper sx={{ 
                  p: { xs: 1, sm: 2 }, 
                  bgcolor: '#1a1a1a', 
                  color: 'white', 
                  border: '1px solid #333', 
                  flex: 1, 
                  minHeight: 0, 
                  overflow: 'auto',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  {isMobile ? renderMobileView() : (
                    <>
                      <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                        Robinhood Style View
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="h4" sx={{ color: '#43ea4a', fontWeight: 700 }}>$1,234,567.89</Typography>
                        <Typography variant="subtitle1" color="text.secondary">Total Account Value</Typography>
                      </Box>
                      <Box sx={{ 
                        flex: 1,
                        bgcolor: '#2a2a2a', 
                        borderRadius: 1, 
                        border: '1px solid #333', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        mb: 2 
                      }}>
                        <Typography variant="body1" color="text.secondary">Graph Placeholder</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                        {['Daily', 'Weekly', 'Monthly', 'YTD', 'Year', '5 Year'].map((period) => (
                          <Button key={period} variant="outlined" sx={{ color: 'white', borderColor: '#333', '&:hover': { borderColor: '#43ea4a' } }}>
                            {period}
                          </Button>
                        ))}
                      </Box>
                    </>
                  )}
                </Paper>
              </Box>
            )
          )}
        </Box>
      </Box>
    </motion.div>
  );
};

export default Legend; 