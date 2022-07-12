// material-ui
import { Link, Typography, Stack } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
  <Stack direction="row" justifyContent="space-between">
    <Typography variant="subtitle2" component={Link} href="https://askbitcoin.ai" target="_blank" underline="hover">
      askbitcoin.ai
    </Typography>
    <Typography variant="subtitle2" component={Link} href="https://askbitcoin.ai" target="_blank" underline="hover">
      &copy; The Proof of Work Company
    </Typography>
  </Stack>
);

export default AuthFooter;
