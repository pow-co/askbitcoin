import Image from 'next/image';
// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Container, Grid, Typography } from '@mui/material';

// project imports
import Slider from './Slider';
import { gridSpacing } from 'store/constant';

// assets
const imgLayout1 = '/assets/images/landing/demo-dark.png';
const imgLayout2 = '/assets/images/landing/demo-rtl.png';
const imgLayout3 = '/assets/images/landing/demo-multi.png';
const imgLayoutGrid = '/assets/images/landing/img-lay-grid.png';
const imgLayoutDarkGrid = '/assets/images/landing/img-bg-grid-dark.svg';

// styles
const LayoutImageWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  position: 'relative',
  margin: '-70px 0px',
  [theme.breakpoints.down('lg')]: {
    margin: '-30px 0px'
  }
}));

const LayoutImage = styled('img')({
  position: 'relative',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  animation: '5s wings ease-in-out infinite'
});

const LayoutContent = styled(Grid)(({ theme }) => ({
  maxWidth: 400,
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    background: theme.palette.mode === 'dark' ? theme.palette.dark.dark : '#FFFFFF',
    border: `6px solid${theme.palette.secondary.main}`,
    width: 25,
    height: 25,
    borderRadius: '50%',
    top: 13,
    left: -20
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    background: theme.palette.mode === 'dark' ? theme.palette.dark.main : '#9E9E9E',
    width: 1,
    height: 390,
    top: 13,
    left: -8
  },
  [theme.breakpoints.down('md')]: {
    '&:before': {
      height: 290
    }
  },
  [theme.breakpoints.down('lg')]: {
    '&:after': {
      left: -12
    },
    '&:before': {
      left: 0,
      height: 290
    }
  }
}));

const LayoutRightContent = styled(Grid)(({ theme }) => ({
  maxWidth: 400,
  textAlign: 'right',
  marginLeft: 'auto',
  position: 'relative',
  paddingRight: 24,
  '&:after': {
    content: '""',
    position: 'absolute',
    background: theme.palette.mode === 'dark' ? theme.palette.dark.dark : '#FFFFFF',
    border: `6px solid${theme.palette.secondary.main}`,
    width: 25,
    height: 25,
    borderRadius: '50%',
    top: 13,
    right: -12
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    background: theme.palette.mode === 'dark' ? theme.palette.dark.main : '#9E9E9E',
    width: 1,
    height: 300,
    top: 13,
    right: -1
  },
  [theme.breakpoints.down('md')]: {
    '&:before': {
      height: '400%'
    }
  },
  [theme.breakpoints.down('lg')]: {
    '&:after': {
      right: -4
    },
    '&:before': {
      right: 7
    }
  },
  [theme.breakpoints.down('md')]: {
    '&:after': {
      right: 'auto',
      left: -12
    },
    '&:before': {
      right: 'auto',
      left: 0,
      height: 160
    }
  }
}));

// =============================|| LANDING - LAYOUTS PAGE ||============================= //

const LayoutsPage = () => {
  const theme = useTheme();

  return (
    <Container>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12} sx={{ display: { xs: 'block', md: 'none' } }}>
          <Slider />
        </Grid>
        <Box sx={{ display: { xs: 'none', md: 'block' }, m: '0 auto' }}>
          <Grid item xs={12}>
            <Grid container alignItems="center" spacing={gridSpacing}>
              <Grid item sm={6}>
                <LayoutImageWrapper>
                  <Image
                    src={theme.palette.mode === 'dark' ? imgLayoutDarkGrid : imgLayoutGrid}
                    alt="Berry Dashboard"
                    layout="fill"
                    width="100%"
                    height="100%"
                  />
                  <LayoutImage src={imgLayout1} alt="Berry" />
                </LayoutImageWrapper>
              </Grid>
              <Grid item sm={6}>
                <LayoutContent container spacing={2}>
                  <Grid item sm={12}>
                    <Typography variant="h4" component="div">
                      Dark Layout
                    </Typography>
                  </Grid>
                  <Grid item sm={12}>
                    <Typography variant="body2">Modern, sleek and elegant dark color scheme that looks great in a dark variant.</Typography>
                  </Grid>
                </LayoutContent>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems="center" spacing={gridSpacing}>
              <Grid item sm={6}>
                <LayoutRightContent container spacing={2}>
                  <Grid item sm={12}>
                    <Typography variant="h4" component="div">
                      RTL
                    </Typography>
                  </Grid>
                  <Grid item sm={12}>
                    <Typography variant="body2">Fully Support Right-to-left (RTL) design variant.</Typography>
                  </Grid>
                </LayoutRightContent>
              </Grid>
              <Grid item sm={6}>
                <LayoutImageWrapper>
                  <Image
                    src={theme.palette.mode === 'dark' ? imgLayoutDarkGrid : imgLayoutGrid}
                    alt="Berry Dashboard"
                    layout="fill"
                    width="100%"
                    height="100%"
                  />
                  <LayoutImage src={imgLayout2} alt="Berry" style={{ animationDelay: '1.5s' }} />
                </LayoutImageWrapper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems="center" spacing={gridSpacing}>
              <Grid item sm={6}>
                <LayoutImageWrapper>
                  <Image
                    src={theme.palette.mode === 'dark' ? imgLayoutDarkGrid : imgLayoutGrid}
                    alt="Berry Dashboard"
                    layout="fill"
                    width="100%"
                    height="100%"
                  />
                  <LayoutImage src={imgLayout3} alt="Berry" style={{ animationDelay: '3s' }} />
                </LayoutImageWrapper>
              </Grid>
              <Grid item sm={6}>
                <LayoutContent
                  container
                  spacing={2}
                  sx={{
                    '&:before': {
                      background: theme.palette.mode === 'dark' ? theme.palette.dark[900] : '#fff !important'
                    }
                  }}
                >
                  <Grid item sm={12}>
                    <Typography variant="h4" component="div">
                      Multi-language Support
                    </Typography>
                  </Grid>
                  <Grid item sm={12}>
                    <Typography variant="body2">Support Multi-language. Added 4 pre-filled language.</Typography>
                  </Grid>
                </LayoutContent>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Container>
  );
};

export default LayoutsPage;
