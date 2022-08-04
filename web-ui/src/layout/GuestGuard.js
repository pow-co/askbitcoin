import { useMemo } from 'react';
import PropTypes from 'prop-types';

//material-ui
import { useTheme } from '@mui/styles';
import { Toolbar, AppBar, CssBaseline } from '@mui/material';

// project imports
import Customization from './Customization';
import GuestGuard from 'utils/route-guard/GuestGuard';
import NavMotion from './NavMotion';
import Header from './MainLayout/Header/Login';

// ==============================|| MINIMAL LAYOUT ||============================== //

const GuestGuardLayout = ({ children }) => {
  const theme = useTheme;
  const header = useMemo(
    () => (
      <Toolbar>
        <Header />
      </Toolbar>
    ),
    []
  );

  return (
    <NavMotion>
      <GuestGuard>
        <>
          <CssBaseline />

          <AppBar enableColorOnDark position="fixed" color="inherit" elevation={0} sx={{}}>
            {header}
          </AppBar>
          {children}
          <Customization />
        </>
      </GuestGuard>
    </NavMotion>
  );
};

GuestGuardLayout.propTypes = {
  children: PropTypes.node
};

export default GuestGuardLayout;
