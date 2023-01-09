import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Grid, Typography, useMediaQuery } from '@mui/material';

// third party
import dynamic from 'next/dynamic';

// project imports
import MainCard from './MainCard';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

// =============================|| SEO CHART CARD ||============================= //

const SeoChartCard = ({ chartData, value, title, icon, type }) => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <MainCard>
      <Grid container justifyContent="space-between" spacing={2}>
        <Grid item xs={12}>
          <Grid container direction={type === 1 ? 'column-reverse' : 'column'} spacing={type === 1 ? 0 : 1}>
            {value && (
              <Grid item>
                <Typography variant={matchDownMd ? 'h4' : 'h3'}>{value}</Typography>
              </Grid>
            )}
            {(title || icon) && (
              <Grid item container justifyContent="flex-start" alignContent="center">
                {title && <Typography variant="body1">{title}</Typography>}
                {icon && (
                  <Box
                    sx={{
                      ml: 1
                    }}
                  >
                    {icon}
                  </Box>
                )}
              </Grid>
            )}
          </Grid>
        </Grid>
        {chartData && (
          <Grid item xs={12}>
            <ReactApexChart
              options={chartData.options}
              series={chartData.series}
              type={chartData.options.chart.type}
              height={chartData.options.chart.height}
            />
          </Grid>
        )}
      </Grid>
    </MainCard>
  );
};

SeoChartCard.propTypes = {
  chartData: PropTypes.object,
  title: PropTypes.string,
  icon: PropTypes.element,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.number
};

export default SeoChartCard;
