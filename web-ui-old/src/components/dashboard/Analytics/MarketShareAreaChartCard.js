import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, Box, Typography } from '@mui/material';

// third-party

import dynamic from 'next/dynamic';

// project imports
import useConfig from 'hooks/useConfig';
import MainCard from 'components/ui-component/cards/MainCard';

// assets
import { IconBrandFacebook, IconBrandYoutube, IconBrandTwitter } from '@tabler/icons';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const chartOptions = {
  chart: {
    height: 200,
    type: 'area',
    id: 'market-share-area-chart',
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    },
    sparkline: {
      enabled: true
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.5,
      opacityTo: 0,
      stops: [0, 80, 100]
    }
  },
  legend: {
    show: false
  },
  yaxis: {
    min: 1,
    max: 100,
    labels: {
      show: false
    }
  }
};

// ===========================|| DASHBOARD ANALYTICS - MARKET SHARE AREA CHART CARD ||=========================== //

const MarketShareAreaChartCard = () => {
  const theme = useTheme();

  const [series] = useState([
    {
      name: 'Youtube',
      data: [10, 90, 65, 85, 40, 80, 30]
    },
    {
      name: 'Facebook',
      data: [50, 30, 25, 15, 60, 10, 25]
    },
    {
      name: 'Twitter',
      data: [5, 50, 40, 55, 20, 40, 20]
    }
  ]);

  const { navType } = useConfig();

  const secondaryMain = theme.palette.secondary.main;
  const errorMain = theme.palette.error.main;
  const primaryDark = theme.palette.primary.dark;

  const [options, setOptions] = useState(chartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [secondaryMain, errorMain, primaryDark],
      tooltip: {
        theme: navType === 'dark' ? 'dark' : 'light'
      }
    }));
  }, [navType, secondaryMain, errorMain, primaryDark]);

  return (
    <MainCard sx={{ '&>div': { p: 0, pb: '0px !important' } }}>
      <Box
        sx={{
          p: 3
        }}
      >
        <Grid container direction="column" spacing={3}>
          <Grid item container spacing={1} alignItems="center">
            <Grid item>
              <Typography variant="h3">Market Share</Typography>
            </Grid>
            <Grid item xs zeroMinWidth />
            <Grid item>
              <TrendingDownIcon fontSize="large" color="error" />
            </Grid>
            <Grid item>
              <Typography variant="h3">27, 695.65</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ mt: -2.5, fontWeight: 400 }} color="inherit" variant="h5">
              Department wise monthly sales report
            </Typography>
          </Grid>
          <Grid item container justifyContent="space-around" alignItems="center" spacing={3}>
            <Grid item>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <Typography
                    sx={{
                      width: 40,
                      height: 40,
                      color: theme.palette.secondary.main,
                      borderRadius: '12px',
                      padding: 1,
                      backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.secondary.light
                    }}
                  >
                    <IconBrandFacebook stroke={1.5} />
                  </Typography>
                </Grid>
                <Grid item sm zeroMinWidth>
                  <Typography variant="h4">+45.36%</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <Typography
                    sx={{
                      width: 40,
                      height: 40,
                      color: theme.palette.primary.main,
                      borderRadius: '12px',
                      padding: 1,
                      backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.primary.light
                    }}
                  >
                    <IconBrandTwitter stroke={1.5} />
                  </Typography>
                </Grid>
                <Grid item sm zeroMinWidth>
                  <Typography variant="h4">- 50.69%</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <Typography
                    sx={{
                      width: 40,
                      height: 40,
                      color: theme.palette.error.main,
                      borderRadius: '12px',
                      padding: 1,
                      backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.default : '#ffe9e9'
                    }}
                  >
                    <IconBrandYoutube stroke={2} />
                  </Typography>
                </Grid>
                <Grid item sm zeroMinWidth>
                  <Typography variant="h4">+ 16.85%</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs zeroMinWidth />
          </Grid>
        </Grid>
      </Box>
      <ReactApexChart options={options} series={series} type="area" height={200} />
    </MainCard>
  );
};
export default MarketShareAreaChartCard;
