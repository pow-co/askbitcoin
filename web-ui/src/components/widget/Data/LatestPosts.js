// material-ui
import { Button, CardActions, CardContent, CardMedia, Divider, Grid, Typography } from '@mui/material';

// project imports
import MainCard from 'components/ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// assets
const Dashboard1 = '/assets/images/widget/dashborad-1.jpg';
const Dashboard2 = '/assets/images/widget/dashborad-3.jpg';

const mediaSX = {
  width: 90,
  height: 80,
  borderRadius: '12px'
};

// ===========================|| DATA WIDGET - LATEST POSTS CARD ||=========================== //

const LatestPosts = () => (
  <MainCard title="Latest Posts" content={false}>
    <CardContent>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <CardMedia component="img" image={Dashboard1} title="image" sx={mediaSX} />
            </Grid>
            <Grid item xs zeroMinWidth>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography align="left" component="div" variant="subtitle1">
                    Up unpacked friendly
                  </Typography>
                  <Typography align="left" component="div" variant="caption">
                    Video | 14 minutes ago
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <CardMedia component="iframe" src="https://www.youtube.com/embed/668nUCeBHyY" title="image" sx={mediaSX} />
            </Grid>
            <Grid item xs zeroMinWidth>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography align="left" component="div" variant="subtitle1">
                    Up unpacked friendly
                  </Typography>
                  <Typography align="left" component="div" variant="caption">
                    Video | 14 minutes ago
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <CardMedia component="img" image={Dashboard2} title="image" sx={mediaSX} />
            </Grid>
            <Grid item xs zeroMinWidth>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography align="left" component="div" variant="subtitle1">
                    Up unpacked friendly
                  </Typography>
                  <Typography align="left" component="div" variant="caption">
                    Video | 14 minutes ago
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </CardContent>
    <Divider />
    <CardActions sx={{ justifyContent: 'flex-end' }}>
      <Button variant="text" size="small">
        View Friend List
      </Button>
    </CardActions>
  </MainCard>
);

export default LatestPosts;
