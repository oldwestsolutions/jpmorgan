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
  const [currentView, setCurrentView] = useState<'main' | 'bio' | 'options' | 'news'>('main');

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

  const [searchResults, setSearchResults] = useState<{ title: string; description: string; price?: string }[]>([]);
  const [selectedStock, setSelectedStock] = useState<{ title: string; description: string; price?: string } | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearch = (query: string) => {
    if (query.toLowerCase() === 'netflix') {
      setSearchResults([
        { title: '', description: '**Netflix** is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.', price: '$500.00' }
      ]);
      setIsSearchOpen(true);
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
    setSearchResults([]); // Clear search results on click
  };

  const handleBackToAccount = () => {
    setSelectedStock(null);
  };

  const handleViewChange = (view: 'main' | 'bio' | 'options' | 'news') => {
    setCurrentView(view);
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
              <Typography variant="body1" color="text.secondary">
                Netflix, Inc. is an American subscription streaming service and production company. Launched on August 29, 1997, it offers a film and television series library through distribution deals as well as its own productions, known as Netflix Originals.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ p: 2, bgcolor: '#2a2a2a', borderRadius: 1, border: '1px solid #333' }}>
              <Typography variant="h6" sx={{ mb: 1 }}>Leadership</Typography>
              <Typography variant="body1" color="text.secondary">
                Reed Hastings (Co-Founder & Co-CEO)
                Ted Sarandos (Co-CEO)
                Greg Peters (COO & CPO)
              </Typography>
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
      <Paper sx={{ p: 2, bgcolor: '#1a1a1a', color: 'white', border: '1px solid #333' }}>
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
                  '&:hover': { bgcolor: '#333' },
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
                  '&:hover': { bgcolor: '#333' },
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

  const renderMobileView = () => (
    <Box sx={{ p: 1 }}>
      <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, fontSize: '1.1rem' }}>
        Robinhood Style View
      </Typography>
      <Box sx={{ mb: 1 }}>
        <Typography variant="h5" sx={{ color: '#43ea4a', fontWeight: 700, fontSize: '1.5rem' }}>$1,234,567.89</Typography>
        <Typography variant="body2" color="text.secondary">Total Account Value</Typography>
      </Box>
      <Box sx={{ height: 150, bgcolor: '#2a2a2a', borderRadius: 1, border: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
        <Typography variant="body2" color="text.secondary">Graph Placeholder</Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 0.5, mb: 1, flexWrap: 'wrap' }}>
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
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <Box sx={{ 
        position: 'absolute', 
        top: '100%', 
        left: 0, 
        right: 0, 
        bgcolor: 'rgba(26, 26, 26, 0.95)', 
        borderRadius: 1, 
        border: '1px solid #333', 
        zIndex: 1,
        maxHeight: '80vh',
        overflowY: 'auto',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
      }}>
        {searchResults.map((result, index) => (
          <Box 
            key={index} 
            sx={{ 
              p: 1.5, 
              borderBottom: '1px solid #333', 
              '&:last-child': { borderBottom: 'none' }, 
              cursor: 'pointer',
              '&:hover': { bgcolor: '#2a2a2a' }
            }} 
            onClick={() => handleStockClick(result)}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Box 
                component="img"
                src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" 
                alt="Netflix Logo" 
                sx={{ 
                  mr: 1,
                  height: { xs: 24, sm: 30 }
                }}
              />
              <Typography variant="subtitle1" sx={{ ml: 'auto', color: '#43ea4a', fontSize: { xs: '0.875rem', sm: '1rem' } }}>{result.price}</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>{result.description}</Typography>
          </Box>
        ))}
      </Box>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ minHeight: '100vh', bgcolor: '#121212', overflow: 'hidden' }}>
        <AppBar
          position="fixed"
          sx={{
            width: '100%',
            bgcolor: '#1a1a1a',
            borderBottom: '1px solid #333'
          }}
        >
          <Toolbar sx={{ minHeight: { xs: 56, sm: 64 } }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
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
            >
              <Mail sx={{ fontSize: { xs: 24, sm: 28 } }} />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 1, sm: 2 },
            mt: { xs: '56px', sm: '64px' },
            height: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' },
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}
        >
          {selectedStock ? (
            <Paper sx={{ p: { xs: 1, sm: 2 }, bgcolor: '#1a1a1a', color: 'white', border: '1px solid #333', flex: 1, minHeight: 0, overflow: 'auto' }}>
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
                  onClick={() => handleViewChange('options')}
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
              </AnimatePresence>
            </Paper>
          ) : (
            <Paper sx={{ p: { xs: 1, sm: 2 }, bgcolor: '#1a1a1a', color: 'white', border: '1px solid #333', flex: 1, minHeight: 0, overflow: 'auto' }}>
              {isMobile ? renderMobileView() : (
                <>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                    Robinhood Style View
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h4" sx={{ color: '#43ea4a', fontWeight: 700 }}>$1,234,567.89</Typography>
                    <Typography variant="subtitle1" color="text.secondary">Total Account Value</Typography>
                  </Box>
                  <Box sx={{ height: 200, bgcolor: '#2a2a2a', borderRadius: 1, border: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                    <Typography variant="body1" color="text.secondary">Graph Placeholder</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    {['Daily', 'Weekly', 'Monthly', 'YTD', 'Year', '5 Year'].map((period) => (
                      <Button key={period} variant="outlined" sx={{ color: 'white', borderColor: '#333', '&:hover': { borderColor: '#43ea4a' } }}>
                        {period}
                      </Button>
                    ))}
                  </Box>
                </>
              )}
            </Paper>
          )}
        </Box>
      </Box>
    </motion.div>
  );
};

export default Legend; 