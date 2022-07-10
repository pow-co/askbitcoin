import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { useMediaQuery, useScrollTrigger } from '@mui/material';

// project import
import { useSelector } from 'store';

// ==============================|| elevation scroll ||============================== //

function ElevationScroll({ children, window }) {
  const theme = useTheme();
  const matchDown = useMediaQuery(theme.breakpoints.down('lg'));

  const { drawerOpen } = useSelector((state) => state.menu);

  const fullStickyLeft = drawerOpen ? 281 : 42;

  const responsiveTop = matchDown ? 80 : 83;
  const responsiveRight = matchDown ? 38 : 41;
  const responsiveLeft = matchDown ? 38 : fullStickyLeft;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 180,
    target: window || undefined
  });

  const darkBorder = theme.palette.mode === 'dark' ? theme.palette.dark.dark : theme.palette.grey[200];

  return React.cloneElement(children, {
    style: {
      backgroundColor: theme.palette.background.default,
      zIndex: 1099,
      borderTop: trigger ? '1px solid' : 'none',
      borderBottom: trigger ? '1px solid' : 'none',
      borderColor: trigger ? darkBorder : '',
      position: trigger ? 'fixed' : 'relative',

      top: trigger ? responsiveTop : 'auto',
      right: trigger ? responsiveRight : 'auto',
      left: trigger ? responsiveLeft : 'auto'
    }
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.node,
  window: PropTypes.object
};

export default ElevationScroll;
