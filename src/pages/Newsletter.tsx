import React from 'react';
import { Box, Button, Container, Paper, Typography, Grid, Divider, TextField, Stack, Link, List, ListItem, ListItemText, Card, CardContent } from '@mui/material';
import { Email, Payment, Apple, AccountCircle, Lock, CheckCircle, TrendingUp, ShowChart, Timeline, TrendingFlat, Functions, QueryStats, Analytics, Speed, Assessment, BarChart, TimelineOutlined, Psychology, Star } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const CARD_RADIUS = 4;
const SECTION_BG = '#202225';
const SECTION_HEADER = '#43ea4a';

const features = [
  {
    icon: <Star sx={{ color: SECTION_HEADER, fontSize: 36 }} />,
    title: 'Value Investing Alerts',
    desc: "Based on Benjamin Graham's principles, get alerts for:",
    points: [
      'Margin of Safety opportunities',
      'Net-Net stock candidates',
      'Intrinsic value calculations',
      'Quality vs. Price metrics',
    ],
  },
  {
    icon: <Psychology sx={{ color: SECTION_HEADER, fontSize: 36 }} />,
    title: 'Options Greeks Alerts',
    desc: 'Real-time monitoring of:',
    points: [
      'Delta: Price sensitivity',
      'Gamma: Delta changes',
      'Theta: Time decay',
      'Vega: Volatility impact',
    ],
  },
  {
    icon: <TrendingUp sx={{ color: SECTION_HEADER, fontSize: 36 }} />,
    title: 'Iron Condor Alerts',
    desc: 'Get notified of optimal setups for:',
    points: [
      'High-probability ranges',
      'IV percentile opportunities',
      'Risk/reward ratios',
    ],
  },
  {
    icon: <ShowChart sx={{ color: SECTION_HEADER, fontSize: 36 }} />,
    title: 'Butterfly Spreads',
    desc: 'Alerts for:',
    points: [
      'Symmetrical setups',
      'Profit zone calculations',
      'Break-even points',
    ],
  },
  {
    icon: <Timeline sx={{ color: SECTION_HEADER, fontSize: 36 }} />,
    title: 'Calendar Spreads',
    desc: 'Notifications for:',
    points: [
      'IV skew opportunities',
      'Time decay advantages',
      'Rolling opportunities',
    ],
  },
  {
    icon: <TrendingFlat sx={{ color: SECTION_HEADER, fontSize: 36 }} />,
    title: 'Straddles & Strangles',
    desc: 'Volatility-based alerts for:',
    points: [
      'Earnings plays',
      'IV crush opportunities',
      'Volatility expansion/contraction',
    ],
  },
  {
    icon: <Functions sx={{ color: SECTION_HEADER, fontSize: 36 }} />,
    title: 'Ratio Spreads',
    desc: 'Directional bias alerts for:',
    points: [
      'Backspreads',
      'Frontspreads',
      'Risk-defined setups',
    ],
  },
  {
    icon: <QueryStats sx={{ color: SECTION_HEADER, fontSize: 36 }} />,
    title: 'Diagonal Spreads',
    desc: 'Time-based alerts for:',
    points: [
      'PMCC setups',
      "Poor man's covered calls",
      'Rolling opportunities',
    ],
  },
  {
    icon: <Analytics sx={{ color: SECTION_HEADER, fontSize: 36 }} />,
    title: 'Bollinger Bands',
    desc: 'Advanced alerts for:',
    points: [
      'Band width expansion/contraction',
      '%B indicator crossovers',
      'Multiple timeframe analysis',
    ],
  },
  {
    icon: <Speed sx={{ color: SECTION_HEADER, fontSize: 36 }} />,
    title: 'VWAP Analysis',
    desc: 'Institutional-grade alerts for:',
    points: [
      'Volume profile analysis',
      'Price action vs VWAP',
      'Institutional order flow',
    ],
  },
  {
    icon: <Assessment sx={{ color: SECTION_HEADER, fontSize: 36 }} />,
    title: 'Monte Carlo',
    desc: 'Probability-based alerts for:',
    points: [
      'Price distribution forecasts',
      'Risk assessment scenarios',
      'Portfolio optimization',
    ],
  },
  {
    icon: <BarChart sx={{ color: SECTION_HEADER, fontSize: 36 }} />,
    title: 'Market Profile',
    desc: 'Advanced volume analysis for:',
    points: [
      'Value area identification',
      'POC (Point of Control) shifts',
      'Volume distribution patterns',
    ],
  },
  {
    icon: <TimelineOutlined sx={{ color: SECTION_HEADER, fontSize: 36 }} />,
    title: 'Elliott Wave',
    desc: 'Pattern recognition alerts for:',
    points: [
      'Wave structure completion',
      'Fibonacci retracement levels',
      'Wave relationship analysis',
    ],
  },
  {
    icon: <Psychology sx={{ color: SECTION_HEADER, fontSize: 36 }} />,
    title: 'Market Psychology',
    desc: 'Sentiment analysis alerts for:',
    points: [
      'Fear & Greed indicators',
      'Put/Call ratio extremes',
      'Market breadth divergences',
    ],
  },
];

const Newsletter: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{
      minHeight: '100vh',
      py: 4,
      bgcolor: 'transparent',
      background: 'linear-gradient(135deg, #181818 0%, #232425 100%)',
    }}>
      {/* Header with logo and Newsletter button */}
      <Container maxWidth="xl" sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', justifyContent: 'center', mb: 2, gap: 2 }}>
          <Link href="/newsletter" underline="none">
            <Typography variant="h3" sx={{ fontFamily: 'Georgia, serif', fontWeight: 800, color: 'white', letterSpacing: 2, textTransform: 'uppercase' }}>
              General Exchange Newsletter
            </Typography>
          </Link>
          <Button
            variant="contained"
            color="primary"
            sx={{ ml: { sm: 4 }, bgcolor: '#222', color: '#fff', fontWeight: 700, borderRadius: 3, px: 4, py: 1.5, fontSize: { xs: 15, md: 18 }, boxShadow: '0 2px 8px #0002', '&:hover': { bgcolor: '#333', color: '#fff' } }}
            onClick={() => navigate('/newsletter')}
          >
            Newsletter
          </Button>
        </Box>
        <Divider sx={{ borderColor: '#222' }} />
      </Container>

      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* Left Column - Main Content */}
          <Grid item xs={12} md={7}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h3" sx={{ fontWeight: 900, color: 'white', fontFamily: 'Georgia, serif', textAlign: 'center', mb: 1 }}>
                Precision Price Alerts, Not Noise
              </Typography>
              <Typography variant="h5" sx={{ color: '#bbb', mb: 3, textAlign: 'center', fontWeight: 600 }}>
                Institutional-Grade Trading Intelligence
              </Typography>
                      </Box>
              <Grid container spacing={3}>
              {features.map((feature, idx) => (
                <Grid item xs={12} sm={6} md={6} lg={4} key={feature.title}>
                  <Card sx={{ bgcolor: SECTION_BG, color: 'white', borderRadius: CARD_RADIUS, boxShadow: '0 4px 24px #0008', border: '1.5px solid #232425', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        {feature.icon}
                        <Typography variant="h6" sx={{ fontWeight: 700, color: SECTION_HEADER, ml: 1, fontFamily: 'Georgia, serif' }}>{feature.title}</Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: '#bbb', mb: 1 }}>{feature.desc}</Typography>
                      <List dense sx={{ color: '#bbb', pl: 1 }}>
                        {feature.points.map((item, i) => (
                          <ListItem key={i} sx={{ display: 'flex', alignItems: 'flex-start', py: 0.5 }}>
                            <CheckCircle sx={{ color: SECTION_HEADER, fontSize: 18, mt: '2px', mr: 1 }} />
                            <ListItemText primary={item} primaryTypographyProps={{ sx: { color: '#bbb', fontSize: 15 } }} />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
                </Grid>
            <Box sx={{ mt: 4 }}>
              <Paper elevation={0} sx={{ bgcolor: 'transparent', color: '#bbb', p: 2, borderRadius: 2, textAlign: 'center' }}>
                <Typography variant="body2">
                  Plus alerts for: Box Spreads, Jelly Rolls, Collars, Protective Puts, Covered Calls, Cash-Secured Puts, Vertical Spreads, Horizontal Spreads, Ichimoku Cloud, Keltner Channels, Fibonacci Time Zones, Harmonic Patterns, Wyckoff Method, Volume Delta, Order Flow Analysis, and more.
              </Typography>
            </Paper>
            </Box>
          </Grid>

          {/* Right Column - Sign Up Form */}
          <Grid item xs={12} md={5}>
            <Paper elevation={0} sx={{ bgcolor: '#181818', borderRadius: CARD_RADIUS, p: { xs: 2, md: 4 }, position: 'sticky', top: 20, boxShadow: '0 8px 32px #0008' }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: 'white', mb: 2, textAlign: 'center' }}>
                Create Your Account & Subscribe
              </Typography>
              <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ mb: 2 }}>
                <TextField
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  required
                  InputProps={{ style: { color: 'white', background: '#222' }, startAdornment: <AccountCircle sx={{ color: '#bbb', mr: 1 }} /> }}
                  InputLabelProps={{ style: { color: '#bbb' } }}
                />
                <TextField
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  required
                  InputProps={{ style: { color: 'white', background: '#222' }, startAdornment: <AccountCircle sx={{ color: '#bbb', mr: 1 }} /> }}
                  InputLabelProps={{ style: { color: '#bbb' } }}
                />
              </Stack>
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                required
                sx={{ mb: 2 }}
                InputProps={{ style: { color: 'white', background: '#222' }, startAdornment: <Email sx={{ color: '#bbb', mr: 1 }} /> }}
                InputLabelProps={{ style: { color: '#bbb' } }}
              />
              <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  required
                  InputProps={{ style: { color: 'white', background: '#222' }, startAdornment: <Lock sx={{ color: '#bbb', mr: 1 }} /> }}
                  InputLabelProps={{ style: { color: '#bbb' } }}
                />
                <TextField
                  label="Confirm Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  required
                  InputProps={{ style: { color: 'white', background: '#222' }, startAdornment: <Lock sx={{ color: '#bbb', mr: 1 }} /> }}
                  InputLabelProps={{ style: { color: '#bbb' } }}
                />
              </Stack>
              <Typography variant="subtitle1" sx={{ color: '#bbb', mt: 3, mb: 1, textAlign: 'center' }}>
                Choose Payment Method
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" alignItems="center" sx={{ mb: 2 }}>
                <Button variant="outlined" startIcon={<Payment />} sx={{ color: '#fff', borderColor: '#fff', bgcolor: '#222', '&:hover': { bgcolor: '#333', borderColor: '#fff' }, fontWeight: 700, px: 4, py: 1.5 }}>
                  Pay with Square
                </Button>
                <Button variant="outlined" startIcon={<img src="https://www.paypalobjects.com/webstatic/icon/pp258.png" alt="PayPal" style={{ width: 22, height: 22 }} />} sx={{ color: '#fff', borderColor: '#fff', bgcolor: '#222', '&:hover': { bgcolor: '#333', borderColor: '#fff' }, fontWeight: 700, px: 4, py: 1.5 }}>
                  Pay with PayPal
                </Button>
                <Button variant="outlined" startIcon={<Apple />} sx={{ color: '#fff', borderColor: '#fff', bgcolor: '#222', '&:hover': { bgcolor: '#333', borderColor: '#fff' }, fontWeight: 700, px: 4, py: 1.5 }}>
                  Apple Pay
                </Button>
              </Stack>
              <Button variant="contained" color="primary" fullWidth sx={{ bgcolor: '#fff', color: '#111', fontWeight: 700, borderRadius: 2, px: 5, py: 2, fontSize: 20, '&:hover': { bgcolor: '#eee', color: '#111' }, mt: 2 }}>
                Subscribe & Create Account
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Newsletter; 