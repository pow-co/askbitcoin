import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Card, Grid, Typography } from '@mui/material';

// third party
import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

// ============================|| TOTAL LINE CHART CARD ||============================ //

const TotalLineChartCard = ({ bgColor, chartData, title, percentage, value }) => {
  const theme = useTheme();

  return (
    <Card>
      <Box sx={{ color: '#fff', bgcolor: bgColor || theme.palette.primary.dark }}>
        <Box sx={{ p: 2.5 }}>
          <Grid container direction="column">
            <Grid item container justifyContent="space-between" alignItems="center">
              {value && (
                <Grid item>
                  <Typography variant="h3" color="inherit">
                    {value}
                  </Typography>
                </Grid>
              )}
              {percentage && (
                <Grid item>
                  <Typography variant="body2" color="inherit">
                    {percentage}
                  </Typography>
                </Grid>
              )}
            </Grid>
            {title && (
              <Grid item>
                <Typography variant="body2" color="inherit">
                  {title}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Box>
        {chartData && (
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type={chartData.options.chart.type}
            height={chartData.options.chart.height}
          />
        )}
      </Box>
    </Card>
  );
};

TotalLineChartCard.propTypes = {
  bgColor: PropTypes.string,
  chartData: PropTypes.object,
  title: PropTypes.string,
  percentage: PropTypes.string,
  value: PropTypes.number
};

export default TotalLineChartCard;
