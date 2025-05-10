import React from 'react';
import { Box, Container, Typography, Grid, Paper, Divider, Link, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const News: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ bgcolor: '#f8f9fa', minHeight: '100vh', py: 4 }}>
      {/* Header with logo and Newsletter button */}
      <Container maxWidth="lg" sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', justifyContent: 'center', mb: 2, gap: 2 }}>
          <Link href="/" underline="none">
            <Typography variant="h3" sx={{ fontFamily: 'Georgia, serif', fontWeight: 800, color: '#222', letterSpacing: 2, textTransform: 'uppercase' }}>
              RobberBaron News
            </Typography>
          </Link>
          <Button
            variant="contained"
            color="primary"
            sx={{ ml: { sm: 4 }, bgcolor: '#111', color: '#fff', fontWeight: 700, borderRadius: 3, px: 4, py: 1.5, fontSize: { xs: 15, md: 18 }, boxShadow: '0 2px 8px #0002', '&:hover': { bgcolor: '#222', color: '#fff' } }}
            onClick={() => navigate('/newsletter')}
          >
            Go to Newsletter
          </Button>
        </Box>
        <Divider />
      </Container>

      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid item xs={12} md={8}>
            {/* Featured Article */}
            <Paper elevation={0} sx={{ p: 4, mb: 4, bgcolor: '#fff', borderRadius: 3, boxShadow: '0 2px 12px #0001' }}>
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, fontFamily: 'Georgia, serif', color: '#222' }}>
                Market Volatility Surges as Fed Signals Rate Uncertainty
              </Typography>
              <Typography variant="subtitle2" sx={{ color: '#888', mb: 2 }}>
                By Jane Doe | June 2024
              </Typography>
              <img src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=900&q=80" alt="Market" style={{ width: '100%', borderRadius: 8, marginBottom: 16, maxHeight: 320, objectFit: 'cover' }} />
              <Typography variant="body1" sx={{ color: '#333', mb: 2 }}>
                U.S. stocks tumbled Thursday as Federal Reserve officials signaled a more cautious approach to interest rates, sending volatility indexes to their highest levels in months. Analysts say the uncertainty could persist through the summer as investors weigh inflation data and global economic risks.
              </Typography>
              <Divider sx={{ my: 2 }} />
              {/* AdSense Placeholder (Top of Article) */}
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                {/* Google AdSense Placeholder */}
                <Box sx={{ width: 336, height: 280, bgcolor: '#eee', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', fontWeight: 700, fontSize: 18 }}>
                  {/* NYT AdSense: Top Rectangle */}
                  {/* <ins class="adsbygoogle" style={{display:'inline-block',width:'336px',height:'280px'}} data-ad-client="ca-pub-xxxxxxxx" data-ad-slot="yyyyyyyy"></ins> */}
                  Ad — 336x280
                </Box>
              </Box>
            </Paper>

            {/* News Grid */}
            <Grid container spacing={3}>
              {[1,2,3,4].map((i) => (
                <Grid item xs={12} sm={6} key={i}>
                  <Paper elevation={0} sx={{ p: 3, bgcolor: '#fff', borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: 'Georgia, serif', color: '#222', mb: 1 }}>
                        {i === 1 ? 'AI Trading Algorithms Outperform S&P 500' :
                         i === 2 ? 'Options Volume Hits Record Highs' :
                         i === 3 ? 'Value Investing Sees Resurgence in 2024' :
                         'Crypto Markets React to Regulatory News'}
                      </Typography>
                      <Typography variant="subtitle2" sx={{ color: '#888', mb: 1 }}>
                        {i === 1 ? 'By John Smith' :
                         i === 2 ? 'By Emily Lee' :
                         i === 3 ? 'By Michael Brown' :
                         'By Sarah Kim'}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#444', mb: 2 }}>
                        {i === 1 ? 'Quantitative hedge funds leveraging AI and machine learning have posted double-digit returns, outpacing traditional benchmarks.' :
                         i === 2 ? 'Options trading activity has surged, with retail and institutional investors seeking leverage amid market swings.' :
                         i === 3 ? 'Benjamin Graham-style value stocks are back in favor as investors hunt for bargains in a volatile market.' :
                         'Bitcoin and Ethereum prices fluctuated sharply after new regulatory proposals were announced in Washington.'}
                      </Typography>
                    </Box>
                    {/* AdSense Placeholder (Between Articles) */}
                    {i === 2 && (
                      <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                        {/* Google AdSense Placeholder */}
                        <Box sx={{ width: 300, height: 250, bgcolor: '#eee', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', fontWeight: 700, fontSize: 16 }}>
                          {/* NYT AdSense: Medium Rectangle */}
                          {/* <ins class="adsbygoogle" style={{display:'inline-block',width:'300px',height:'250px'}} data-ad-client="ca-pub-xxxxxxxx" data-ad-slot="zzzzzzzz"></ins> */}
                          Ad — 300x250
                        </Box>
                      </Box>
                    )}
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <Box sx={{ position: 'sticky', top: 32 }}>
              {/* AdSense Placeholder (Sidebar) */}
              <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ width: 300, height: 600, bgcolor: '#eee', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', fontWeight: 700, fontSize: 18 }}>
                  {/* NYT AdSense: Skyscraper */}
                  {/* <ins class="adsbygoogle" style={{display:'inline-block',width:'300px',height:'600px'}} data-ad-client="ca-pub-xxxxxxxx" data-ad-slot="ssssssss"></ins> */}
                  Ad — 300x600
                </Box>
              </Box>
              <Paper elevation={0} sx={{ p: 3, mb: 4, bgcolor: '#fff', borderRadius: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: 'Georgia, serif', color: '#222', mb: 2 }}>
                  Market Updates
                </Typography>
                <Typography variant="body2" sx={{ color: '#444', mb: 1 }}>
                  S&P 500: 5,200.12 <span style={{ color: '#43ea4a', fontWeight: 700 }}>(+0.8%)</span>
                </Typography>
                <Typography variant="body2" sx={{ color: '#444', mb: 1 }}>
                  Nasdaq: 16,000.45 <span style={{ color: '#e94343', fontWeight: 700 }}>(-0.3%)</span>
                </Typography>
                <Typography variant="body2" sx={{ color: '#444', mb: 1 }}>
                  Dow Jones: 38,500.67 <span style={{ color: '#43ea4a', fontWeight: 700 }}>(+0.2%)</span>
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2" sx={{ color: '#888' }}>
                  Data as of market close, June 2024
                </Typography>
              </Paper>
              <Paper elevation={0} sx={{ p: 3, bgcolor: '#fff', borderRadius: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: 'Georgia, serif', color: '#222', mb: 2 }}>
                  Trending Topics
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Link href="#" sx={{ color: '#1976d2', fontWeight: 600 }}>Fed Policy</Link>
                  <Link href="#" sx={{ color: '#1976d2', fontWeight: 600 }}>AI in Finance</Link>
                  <Link href="#" sx={{ color: '#1976d2', fontWeight: 600 }}>Options Strategies</Link>
                  <Link href="#" sx={{ color: '#1976d2', fontWeight: 600 }}>Crypto Regulation</Link>
                  <Link href="#" sx={{ color: '#1976d2', fontWeight: 600 }}>Value Investing</Link>
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default News; 