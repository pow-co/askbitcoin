// material-ui
import { Typography } from '@mui/material';

// project imports
import MainCard from 'components/ui-component/cards/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

const SamplePage = () => (
  <MainCard title="Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna alissa?">
    <Typography variant="body2">
      Author: 1DJCecQbxLjZyKQJChiuqeZiCkQgy3H1Qb
    </Typography>
  </MainCard>
);
SamplePage.Layout = 'authGuard';
export default SamplePage;
