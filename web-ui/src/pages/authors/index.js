// material-ui
import { Typography } from '@mui/material';

// project imports
import MainCard from 'components/ui-component/cards/MainCard';
import { FormattedMessage } from 'react-intl';


// ==============================|| SAMPLE PAGE ||============================== //

const SamplePage = () => (
  <MainCard title={<FormattedMessage id="authors-pow"/>}>
    <Typography variant="body2">
      
    </Typography>
  </MainCard>
);
SamplePage.Layout = 'authGuard';
export default SamplePage;
