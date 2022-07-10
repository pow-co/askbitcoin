import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, Grid, Typography } from '@mui/material';

// third-party

import dynamic from 'next/dynamic';

// project imports
import useConfig from 'hooks/useConfig';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const chartOptions = {
  chart: {
    id: 'support-chart',
    type: 'area',
    height: 95,
    sparkline: {
      enabled: true
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 1
  },
  tooltip: {
    fixed: {
      enabled: false
    },
    x: {
      show: false
    },
    y: {
      title: {
        formatter: () => 'Ticket '
      }
    },
    marker: {
      show: false
    }
  }
};

// ===========================|| DASHBOARD DEFAULT - BAJAJ AREA CHART CARD ||=========================== //

const BajajAreaChartCard = () => {
  const theme = useTheme();

  const [series] = useState([
    {
      data: [0, 15, 10, 50, 30, 40, 25]
    }
  ]);

  const { navType } = useConfig();

  const orangeDark = theme.palette.secondary[800];

  const [options, setOptions] = useState(chartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [orangeDark],
      tooltip: {
        theme: navType === 'dark' ? 'dark' : 'light'
      }
    }));
  }, [navType, orangeDark]);

  return (
    <Card sx={{ bgcolor: 'secondary.light' }}>
      <Grid container sx={{ p: 2, pb: 0, color: '#fff' }}>
        <Grid item xs={12}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="subtitle1" sx={{ color: theme.palette.secondary.dark }}>
                Bajaj Finery
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h4" sx={{ color: theme.palette.grey[800] }}>
                $1839.00
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={{ color: theme.palette.grey[800] }}>
            10% Profit
          </Typography>
        </Grid>
      </Grid>
      {typeof window !== 'undefined' && <ReactApexChart options={options} series={series} type="area" height={95} />}
    </Card>
  );
};

export default BajajAreaChartCard;
