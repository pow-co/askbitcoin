// material-ui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Typography } from '@mui/material';

// project imports
import FadeInWhenVisible from './Animation';
import SubCard from 'components/ui-component/cards/SubCard';
import Avatar from 'components/ui-component/extended/Avatar';
import { gridSpacing } from 'store/constant';

// assets
import PaletteTwoToneIcon from '@mui/icons-material/PaletteTwoTone';
import ReorderTwoToneIcon from '@mui/icons-material/ReorderTwoTone';
import SpeedTwoToneIcon from '@mui/icons-material/SpeedTwoTone';

// =============================|| LANDING - FEATURE PAGE ||============================= //

const FeaturePage = () => {
  const theme = useTheme();
  return (
    <Container>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12} lg={5} md={10}>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item>
                  <Typography variant="h5" color="primary">
                    Top Features
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h2" component="div">
                What Berry brings to you?
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">
                Berry is a solid dashboard template for your next project, with the following top features.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={gridSpacing} sx={{ textAlign: 'center' }}>
            <Grid item md={4} sm={6}>
              <FadeInWhenVisible>
                <SubCard>
                  <Grid container justifyContent="center" spacing={2}>
                    <Grid item>
                      <Avatar
                        size="xl"
                        variant="rounded"
                        sx={{
                          background: theme.palette.mode === 'dark' ? theme.palette.dark[900] : theme.palette.primary.light,
                          color: theme.palette.primary.main
                        }}
                      >
                        <PaletteTwoToneIcon fontSize="large" />
                      </Avatar>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h3">Beautiful User Interface</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2">
                        Warm color palates and minimally designed interfaces make the user experience more comfortable.
                      </Typography>
                    </Grid>
                  </Grid>
                </SubCard>
              </FadeInWhenVisible>
            </Grid>
            <Grid item md={4} sm={6}>
              <FadeInWhenVisible>
                <SubCard>
                  <Grid container justifyContent="center" spacing={2}>
                    <Grid item>
                      <Avatar
                        size="xl"
                        variant="rounded"
                        sx={{
                          background: theme.palette.mode === 'dark' ? theme.palette.dark[900] : theme.palette.secondary.light,
                          color: theme.palette.secondary.main
                        }}
                      >
                        <ReorderTwoToneIcon fontSize="large" />
                      </Avatar>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h3">Modern Technology Stack</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2">
                        Technology behind Berry is less complicated so you can focus on creating the actual web applications.
                      </Typography>
                    </Grid>
                  </Grid>
                </SubCard>
              </FadeInWhenVisible>
            </Grid>
            <Grid item md={4} sm={6}>
              <FadeInWhenVisible>
                <SubCard>
                  <Grid container justifyContent="center" spacing={2}>
                    <Grid item>
                      <Avatar
                        size="xl"
                        variant="rounded"
                        sx={{
                          background: theme.palette.mode === 'dark' ? theme.palette.dark[900] : theme.palette.success.light,
                          color: theme.palette.success.dark
                        }}
                      >
                        <SpeedTwoToneIcon fontSize="large" />
                      </Avatar>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h3">Performance Centric</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2">
                        Code that makes it easier and faster to render the page for your web applications.
                      </Typography>
                    </Grid>
                  </Grid>
                </SubCard>
              </FadeInWhenVisible>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FeaturePage;
