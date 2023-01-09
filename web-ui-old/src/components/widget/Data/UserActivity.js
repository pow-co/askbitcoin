// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, Badge, Button, CardActions, CardContent, Divider, Grid, Typography } from '@mui/material';

// project imports
import MainCard from 'components/ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// assets
import WatchLaterTwoToneIcon from '@mui/icons-material/WatchLaterTwoTone';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const Avatar1 = '/assets/images/users/avatar-1.png';
const Avatar2 = '/assets/images/users/avatar-2.png';
const Avatar3 = '/assets/images/users/avatar-3.png';

// ===========================|| DATA WIDGET - USER ACTIVITY CARD ||=========================== //

const UserActivity = () => {
  const theme = useTheme();

  const iconSX = {
    fontSize: '0.875rem',
    marginRight: 0.2,
    verticalAlign: 'sub'
  };

  return (
    <MainCard title="User Activity" content={false}>
      <CardContent>
        <Grid container spacing={gridSpacing} alignItems="center">
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item>
                <Box sx={{ position: 'relative' }}>
                  <Badge
                    overlap="circular"
                    badgeContent={<FiberManualRecordIcon sx={{ color: theme.palette.success.main, fontSize: '0.875rem' }} />}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                    }}
                  >
                    <Avatar alt="image" src={Avatar1} />
                  </Badge>
                </Box>
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography align="left" component="div" variant="subtitle1">
                  John Deo
                </Typography>
                <Typography align="left" component="div" variant="subtitle2">
                  Lorem Ipsum is simply dummy text.
                </Typography>
              </Grid>
              <Grid item>
                <Typography align="left" variant="caption">
                  <WatchLaterTwoToneIcon sx={iconSX} />2 min ago
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item>
                <Box sx={{ position: 'relative' }}>
                  <Badge
                    overlap="circular"
                    badgeContent={<FiberManualRecordIcon sx={{ color: theme.palette.error.main, fontSize: '0.875rem' }} />}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                    }}
                  >
                    <Avatar alt="image" src={Avatar2} />
                  </Badge>
                </Box>
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography align="left" variant="subtitle1">
                  John Deo
                </Typography>
                <Typography align="left" variant="subtitle2">
                  Lorem Ipsum is simply dummy text.
                </Typography>
              </Grid>
              <Grid item>
                <Typography align="left" variant="caption">
                  <WatchLaterTwoToneIcon sx={iconSX} />2 min ago
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item>
                <Box sx={{ position: 'relative' }}>
                  <Badge
                    overlap="circular"
                    badgeContent={<FiberManualRecordIcon sx={{ color: theme.palette.warning.main, fontSize: '0.875rem' }} />}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                    }}
                  >
                    <Avatar alt="image" src={Avatar3} />
                  </Badge>
                </Box>
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography align="left" component="div" variant="subtitle1">
                  John Deo
                </Typography>
                <Typography align="left" component="div" variant="subtitle2">
                  Lorem Ipsum is simply dummy text.
                </Typography>
              </Grid>
              <Grid item>
                <Typography align="left" variant="caption">
                  <WatchLaterTwoToneIcon sx={iconSX} />2 min ago
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item>
                <Box sx={{ position: 'relative' }}>
                  <Badge
                    overlap="circular"
                    badgeContent={<FiberManualRecordIcon sx={{ color: theme.palette.success.main, fontSize: '0.875rem' }} />}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                    }}
                  >
                    <Avatar alt="image" src={Avatar1} />
                  </Badge>
                </Box>
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography align="left" component="div" variant="subtitle1">
                  John Deo
                </Typography>
                <Typography align="left" component="div" variant="subtitle2">
                  Lorem Ipsum is simply dummy text.
                </Typography>
              </Grid>
              <Grid item>
                <Typography align="left" variant="caption">
                  <WatchLaterTwoToneIcon sx={iconSX} />2 min ago
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button variant="text" size="small">
          View all Projects
        </Button>
      </CardActions>
    </MainCard>
  );
};

export default UserActivity;
