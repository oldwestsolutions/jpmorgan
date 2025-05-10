import React, { useState } from 'react';
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
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const DRAWER_WIDTH = 240;

const Legend: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

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

  const handleSearch = (query: string) => {
    if (query.toLowerCase() === 'netflix') {
      setSearchResults([
        { title: '', description: '**Netflix** is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.', price: '$500.00' }
      ]);
    } else {
      setSearchResults([]);
    }
  };

  const handleStockClick = (stock: { title: string; description: string; price?: string }) => {
    setSelectedStock(stock);
    setSearchResults([]); // Clear search results on click
  };

  const handleBackToAccount = () => {
    setSelectedStock(null);
  };

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
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Legend
            </Typography>
            <Box sx={{ position: 'relative', mr: 2 }}>
              <TextField
                placeholder="Search..."
                variant="outlined"
                size="small"
                sx={{ bgcolor: '#2a2a2a', borderRadius: 1, '& .MuiOutlinedInput-root': { color: 'white' } }}
                onChange={(e) => handleSearch(e.target.value)}
              />
              {searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Box sx={{ position: 'absolute', top: '100%', left: 0, right: 0, bgcolor: 'rgba(26, 26, 26, 0.9)', borderRadius: 1, border: '1px solid #333', zIndex: 1 }}>
                    {searchResults.map((result, index) => (
                      <Box key={index} sx={{ p: 1, borderBottom: '1px solid #333', '&:last-child': { borderBottom: 'none' }, cursor: 'pointer' }} onClick={() => handleStockClick(result)}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix Logo" style={{ marginRight: 8, height: 20 }} />
                          <Typography variant="subtitle1" sx={{ ml: 'auto', color: '#43ea4a' }}>{result.price}</Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">{result.description}</Typography>
                      </Box>
                    ))}
                  </Box>
                </motion.div>
              )}
            </Box>
            <IconButton
              size="large"
              edge="end"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
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
              size="large"
              edge="end"
              color="inherit"
            >
              <Mail />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 2,
            mt: '64px',
            height: mainContentHeight,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {selectedStock ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Paper sx={{ p: 2, bgcolor: '#1a1a1a', color: 'white', border: '1px solid #333', flex: 1, minHeight: 0, overflow: 'auto' }}>
                <Button variant="outlined" onClick={handleBackToAccount} sx={{ mb: 2, color: 'white', borderColor: '#333', '&:hover': { borderColor: '#43ea4a' } }}>
                  Back to Account
                </Button>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix Logo" style={{ marginRight: 8, height: 30 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {selectedStock.title}
                  </Typography>
                </Box>
                <Typography variant="body1" color="text.secondary">{selectedStock.description}</Typography>
                <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                  <Button variant="outlined" sx={{ color: 'white', borderColor: '#333', '&:hover': { borderColor: '#43ea4a' } }}>Bio</Button>
                  <Button variant="outlined" sx={{ color: 'white', borderColor: '#333', '&:hover': { borderColor: '#43ea4a' } }}>Future</Button>
                  <Button variant="outlined" sx={{ color: 'white', borderColor: '#333', '&:hover': { borderColor: '#43ea4a' } }}>News</Button>
                </Box>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={6}>
                    <Box sx={{ p: 2, bgcolor: '#2a2a2a', borderRadius: 1, border: '1px solid #333' }}>
                      <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>Stock Price Graph</Typography>
                      <Box sx={{ height: 200, bgcolor: '#2a2a2a', borderRadius: 1, border: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant="body1" color="text.secondary">Graph Placeholder</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ p: 2, bgcolor: '#2a2a2a', borderRadius: 1, border: '1px solid #333' }}>
                      <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>Options Greeks</Typography>
                      <Grid container spacing={1}>
                        <Grid item xs={6}>
                          <Box sx={{ p: 1, bgcolor: '#333', borderRadius: 1, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography variant="body2" color="text.secondary">Delta: 0.65</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box sx={{ p: 1, bgcolor: '#333', borderRadius: 1, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography variant="body2" color="text.secondary">Gamma: 0.02</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box sx={{ p: 1, bgcolor: '#333', borderRadius: 1, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography variant="body2" color="text.secondary">Theta: -0.05</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box sx={{ p: 1, bgcolor: '#333', borderRadius: 1, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography variant="body2" color="text.secondary">Vega: 0.10</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box sx={{ p: 1, bgcolor: '#333', borderRadius: 1, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography variant="body2" color="text.secondary">Rho: 0.01</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box sx={{ p: 1, bgcolor: '#333', borderRadius: 1, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography variant="body2" color="text.secondary">Open Interest: 1000</Typography>
                          </Box>
                        </Grid>
                      </Grid>
                      <Button variant="outlined" sx={{ mt: 2, color: 'white', borderColor: '#333', '&:hover': { borderColor: '#43ea4a' } }}>
                        View Contracts for Sale
                      </Button>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ p: 2, bgcolor: '#2a2a2a', borderRadius: 1, border: '1px solid #333' }}>
                      <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>Business Model</Typography>
                      <Typography variant="body1" color="text.secondary">
                        Netflix's business model involves licensing, creating, and distributing content on its platform. The company has expanded its operations to include film and television production, as well as online distribution.
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ p: 2, bgcolor: '#2a2a2a', borderRadius: 1, border: '1px solid #333' }}>
                      <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>Key Points</Typography>
                      <ul style={{ color: 'text.secondary', paddingLeft: 20 }}>
                        <li>Netflix is a leading streaming service with over 200 million paid memberships.</li>
                        <li>The company produces its own content, known as Netflix Originals.</li>
                        <li>Netflix operates in over 190 countries.</li>
                        <li>The company was founded in 1997 and has since revolutionized the entertainment industry.</li>
                      </ul>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Paper sx={{ p: 2, bgcolor: '#1a1a1a', color: 'white', border: '1px solid #333', flex: 1, minHeight: 0, overflow: 'auto' }}>
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
              </Paper>
            </motion.div>
          )}
        </Box>
      </Box>
    </motion.div>
  );
};

export default Legend; 