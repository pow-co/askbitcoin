// material-ui
import { Avatar, Button, CardActions, CardContent, Divider, Grid, Typography } from '@mui/material';

// project imports
import MainCard from 'components/ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// assets
const Avatar1 = '/assets/images/users/avatar-1.png';
const Avatar2 = '/assets/images/users/avatar-2.png';
const Avatar3 = '/assets/images/users/avatar-3.png';
const Avatar4 = '/assets/images/users/avatar-4.png';

// ===========================|| DATA WIDGET - TEAM MEMBERS CARD ||=========================== //

const TeamMembers = () => (
  <MainCard title="Team Members" content={false}>
    <CardContent>
      <Grid container spacing={gridSpacing} alignItems="center">
        <Grid item xs={12}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar alt="User 1" src={Avatar1} />
            </Grid>
            <Grid item xs zeroMinWidth>
              <Typography align="left" component="div" variant="subtitle1">
                David Jones
              </Typography>
              <Typography align="left" component="div" variant="subtitle2">
                Developer
              </Typography>
            </Grid>
            <Grid item>
              <Typography align="left" variant="caption">
                5 min ago
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar alt="User 1" src={Avatar2} />
            </Grid>
            <Grid item xs zeroMinWidth>
              <Typography align="left" component="div" variant="subtitle1">
                David Jones
              </Typography>
              <Typography align="left" component="div" variant="subtitle2">
                Developer
              </Typography>
            </Grid>
            <Grid item>
              <Typography align="left" variant="caption">
                Today
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar alt="User 1" src={Avatar3} />
            </Grid>
            <Grid item xs zeroMinWidth>
              <Typography align="left" component="div" variant="subtitle1">
                David Jones
              </Typography>
              <Typography align="left" component="div" variant="subtitle2">
                Developer
              </Typography>
            </Grid>
            <Grid item>
              <Typography align="left" variant="caption">
                Yesterday
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar alt="User 1" src={Avatar4} />
            </Grid>
            <Grid item xs zeroMinWidth>
              <Typography align="left" component="div" variant="subtitle1">
                David Jones
              </Typography>
              <Typography align="left" component="div" variant="subtitle2">
                Developer
              </Typography>
            </Grid>
            <Grid item>
              <Typography align="left" variant="caption">
                02-05-2021
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

export default TeamMembers;
