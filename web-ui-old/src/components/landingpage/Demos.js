import Image from 'next/image';
// material-ui
import { Button, ButtonBase, Container, Grid, Typography } from '@mui/material';
import Link from 'Link';
// project imports
import FadeInWhenVisible from './Animation';
import AnimateButton from 'components/ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';

// ==============================|| LANDING - DEMOS PAGE ||============================== //

const DemosPage = () => (
  <Container>
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12} lg={5} md={10}>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item>
                <Typography variant="h5" color="primary">
                  Demos
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h2" component="div">
              Pre-build Dashboard &#38; Apps
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">
              Berry has customized pages with Material-UI components, Apps, Forms and lots more to explore.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={gridSpacing} sx={{ textAlign: 'center' }}>
          <Grid item xs={12} md={4} sm={6}>
            <FadeInWhenVisible>
              <ButtonBase
                component={Link}
                href="/dashboard/default"
                sx={{ width: '100%', height: { xs: '220px', sm: '250px', md: '300px' }, position: 'relative' }}
              >
                <Image src="/assets/images/landing/img-demo-1.jpg" alt="Berry Dashboard" layout="fill" width="100%" height="100%" />
              </ButtonBase>
            </FadeInWhenVisible>
          </Grid>
          <Grid item xs={12} md={4} sm={6}>
            <FadeInWhenVisible>
              <ButtonBase
                sx={{ width: '100%', height: { xs: '220px', sm: '250px', md: '300px' }, position: 'relative' }}
                component={Link}
                href="/app/user/social-profile/posts"
              >
                <Image src="/assets/images/landing/img-demo-2.jpg" alt="Berry Social App" width="100%" height="100%" layout="fill" />
              </ButtonBase>
            </FadeInWhenVisible>
          </Grid>
          <Grid item xs={12} md={4} sm={6}>
            <FadeInWhenVisible>
              <ButtonBase
                component={Link}
                href="/dashboard/default"
                sx={{ width: '100%', height: { xs: '220px', sm: '250px', md: '300px' }, position: 'relative' }}
              >
                <Image src="/assets/images/landing/img-demo-3.jpg" alt="Berry Mail App" layout="fill" width="100%" height="100%" />
              </ButtonBase>
            </FadeInWhenVisible>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ textAlign: 'center', mt: 3 }}>
        <AnimateButton>
          <Button component={Link} href="/forms/components/autocomplete" variant="outlined">
            Explore Components
          </Button>
        </AnimateButton>
      </Grid>
    </Grid>
  </Container>
);

export default DemosPage;
