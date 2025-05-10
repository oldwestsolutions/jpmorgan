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
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

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
  const topMovers = [
    { symbol: 'NVDA', change: '+4.12%' },
    { symbol: 'META', change: '+3.45%' },
    { symbol: 'AMD', change: '+2.98%' },
    { symbol: 'NFLX', change: '-1.23%' },
    { symbol: 'BABA', change: '-2.11%' },
  ];

  return (
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
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
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
            <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleProfileMenuClose}>Settings</MenuItem>
            <Divider sx={{ bgcolor: '#333' }} />
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
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
        <Grid container spacing={2} sx={{ height: '100%' }}>
          {/* Portfolio Summary */}
          <Grid item xs={6} sm={6} md={6} sx={{ height: '50%', display: 'flex', flexDirection: 'column' }}>
            <Paper sx={{ p: 2, bgcolor: '#1a1a1a', color: 'white', border: '1px solid #333', flex: 1, minHeight: 0, overflow: 'auto' }}>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                Portfolio Summary
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Box sx={{ p: 1, bgcolor: '#2a2a2a', borderRadius: 1, border: '1px solid #333' }}>
                    <Typography variant="subtitle2" color="text.secondary">Total Value</Typography>
                    <Typography variant="h5" sx={{ color: '#43ea4a', fontWeight: 700 }}>$1,234,567.89</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ p: 1, bgcolor: '#2a2a2a', borderRadius: 1, border: '1px solid #333' }}>
                    <Typography variant="subtitle2" color="text.secondary">24h Change</Typography>
                    <Typography variant="h5" sx={{ color: '#43ea4a', fontWeight: 700 }}>+2.34%</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ p: 1, bgcolor: '#2a2a2a', borderRadius: 1, border: '1px solid #333' }}>
                    <Typography variant="subtitle2" color="text.secondary">Open Positions</Typography>
                    <Typography variant="h5" sx={{ color: 'white', fontWeight: 700 }}>12</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ p: 1, bgcolor: '#2a2a2a', borderRadius: 1, border: '1px solid #333' }}>
                    <Typography variant="subtitle2" color="text.secondary">Pending Orders</Typography>
                    <Typography variant="h5" sx={{ color: 'white', fontWeight: 700 }}>3</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          {/* Recent Activity */}
          <Grid item xs={6} sm={6} md={6} sx={{ height: '50%', display: 'flex', flexDirection: 'column' }}>
            <Paper sx={{ p: 2, bgcolor: '#1a1a1a', color: 'white', border: '1px solid #333', flex: 1, minHeight: 0, overflow: 'auto' }}>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                Recent Activity
              </Typography>
              <List dense>
                {[1, 2, 3, 4, 5].map((item) => (
                  <ListItem key={item} sx={{ borderBottom: '1px solid #333', '&:last-child': { borderBottom: 'none' } }}>
                    <ListItemIcon>
                      <TrendingUp sx={{ color: '#43ea4a' }} />
                    </ListItemIcon>
                    <ListItemText primary="AAPL Call Option" secondary="Bought 5 contracts @ $2.50" />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
          {/* Market Overview */}
          <Grid item xs={6} sm={6} md={6} sx={{ height: '50%', display: 'flex', flexDirection: 'column' }}>
            <Paper sx={{ p: 2, bgcolor: '#1a1a1a', color: 'white', border: '1px solid #333', flex: 1, minHeight: 0, overflow: 'auto' }}>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                Market Overview
              </Typography>
              <Box sx={{ height: 120, bgcolor: '#2a2a2a', borderRadius: 1, border: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="body1" color="text.secondary">Chart Placeholder</Typography>
              </Box>
            </Paper>
          </Grid>
          {/* Top Movers */}
          <Grid item xs={6} sm={6} md={6} sx={{ height: '50%', display: 'flex', flexDirection: 'column' }}>
            <Paper sx={{ p: 2, bgcolor: '#1a1a1a', color: 'white', border: '1px solid #333', flex: 1, minHeight: 0, overflow: 'auto' }}>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                Top Movers
              </Typography>
              <List dense>
                {topMovers.map((mover) => (
                  <ListItem key={mover.symbol} sx={{ borderBottom: '1px solid #333', '&:last-child': { borderBottom: 'none' } }}>
                    <ListItemText primary={mover.symbol} />
                    <Typography variant="body2" sx={{ color: mover.change.startsWith('+') ? '#43ea4a' : '#ff5252', fontWeight: 700 }}>
                      {mover.change}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Legend; 