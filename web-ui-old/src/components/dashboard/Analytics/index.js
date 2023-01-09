// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, Typography, useMediaQuery } from '@mui/material';

// project imports
import MarketShareAreaChartCard from './MarketShareAreaChartCard';
import TotalRevenueCard from './TotalRevenueCard';
import LatestCustomerTableCard from './LatestCustomerTableCard';
import MainCard from 'components/ui-component/cards/MainCard';
import RevenueCard from 'components/ui-component/cards/RevenueCard';
import UserCountCard from 'components/ui-component/cards/UserCountCard';
import { gridSpacing } from 'store/constant';

// assets
import { IconShare, IconAccessPoint, IconCircles, IconCreditCard } from '@tabler/icons';
import MonetizationOnTwoToneIcon from '@mui/icons-material/MonetizationOnTwoTone';
import AccountCircleTwoTone from '@mui/icons-material/AccountCircleTwoTone';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';

// ==============================|| ANALYTICS DASHBOARD ||============================== //

const Analytics = () => {
  const theme = useTheme();
  const matchDownXs = useMediaQuery(theme.breakpoints.down('sm'));

  const blockSX = {
    p: 2.5,
    borderLeft: '1px solid ',
    borderBottom: '1px solid ',
    borderLeftColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[200],
    borderBottomColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[200]
  };

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12} lg={8} md={6}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <MarketShareAreaChartCard />
          </Grid>
          <Grid item xs={12} lg={6}>
            <RevenueCard
              primary="Revenue"
              secondary="$42,562"
              content="$50,032 Last Month"
              iconPrimary={MonetizationOnTwoToneIcon}
              color={theme.palette.secondary.main}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <RevenueCard
              primary="Orders Received"
              secondary="486"
              content="20% Increase"
              iconPrimary={AccountCircleTwoTone}
              color={theme.palette.primary.main}
            />
          </Grid>
          <Grid item xs={12}>
            <LatestCustomerTableCard />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} lg={4} md={6}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <MainCard
              content={false}
              sx={{
                '& svg': {
                  width: 50,
                  height: 50,
                  color: theme.palette.secondary.main,
                  borderRadius: '14px',
                  p: 1.25,
                  bgcolor: theme.palette.mode === 'dark' ? theme.palette.background.default : 'primary.light'
                }
              }}
            >
              <Grid container alignItems="center" spacing={0}>
                <Grid item xs={12} sm={6} sx={blockSX}>
                  <Grid container alignItems="center" spacing={1} justifyContent={matchDownXs ? 'space-between' : 'center'}>
                    <Grid item>
                      <IconShare stroke={1.5} />
                    </Grid>
                    <Grid item sm zeroMinWidth>
                      <Typography variant="h5" align="center">
                        1000
                      </Typography>
                      <Typography variant="subtitle2" align="center">
                        SHARES
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6} sx={blockSX}>
                  <Grid container alignItems="center" spacing={1} justifyContent={matchDownXs ? 'space-between' : 'center'}>
                    <Grid item>
                      <IconAccessPoint stroke={1.5} />
                    </Grid>
                    <Grid item sm zeroMinWidth>
                      <Typography variant="h5" align="center">
                        600
                      </Typography>
                      <Typography variant="subtitle2" align="center">
                        NETWORK
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container alignItems="center" spacing={0}>
                <Grid item xs={12} sm={6} sx={blockSX}>
                  <Grid container alignItems="center" spacing={1} justifyContent={matchDownXs ? 'space-between' : 'center'}>
                    <Grid item>
                      <IconCircles stroke={1.5} />
                    </Grid>
                    <Grid item sm zeroMinWidth>
                      <Typography variant="h5" align="center">
                        3550
                      </Typography>
                      <Typography variant="subtitle2" align="center">
                        RETURNS
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6} sx={blockSX}>
                  <Grid container alignItems="center" spacing={1} justifyContent={matchDownXs ? 'space-between' : 'center'}>
                    <Grid item>
                      <IconCreditCard stroke={1.5} />
                    </Grid>
                    <Grid item sm zeroMinWidth>
                      <Typography variant="h5" align="center">
                        100%
                      </Typography>
                      <Typography variant="subtitle2" align="center">
                        ORDER
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
          <Grid item xs={12}>
            <TotalRevenueCard />
          </Grid>
          <Grid item xs={12}>
            <UserCountCard primary="Daily user" secondary="1,658" iconPrimary={AccountCircleTwoTone} color={theme.palette.secondary.main} />
          </Grid>
          <Grid item xs={12}>
            <UserCountCard
              primary="Daily page view"
              secondary="1K"
              iconPrimary={DescriptionTwoToneIcon}
              color={theme.palette.primary.main}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Analytics;
