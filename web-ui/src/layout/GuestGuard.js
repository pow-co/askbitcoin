import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { AppBar, Toolbar, CssBaseline, useTheme } from '@mui/material';

// project imports
import Customization from './Customization';
import GuestGuard from 'utils/route-guard/GuestGuard';
import NavMotion from './NavMotion';
import AuthHeader from './MainLayout/Header/AuthHeader';

// ==============================|| MINIMAL LAYOUT ||============================== //

const GuestGuardLayout = ({ children }) => {
  const theme = useTheme();

  const header = useMemo(
    () => (
      <Toolbar>
        <AuthHeader />
      </Toolbar>
    ),
    []
  );
  return (
    <NavMotion>
      <GuestGuard>
        <>
          <CssBaseline />
          <AppBar
            enableColorOnDark
            position="fixed"
            elevation={0}
            sx={{
              bgcolor: theme.palette.background.default
            }}
          >
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
