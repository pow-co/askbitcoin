import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// assets
const AuthPattern = '/assets/images/auth/img-a2-grid.svg';
const AuthPatternDark = '/assets/images/auth/img-a2-grid-dark.svg';

// ===========================|| BACKGROUND GRID PATTERN 2 ||=========================== //

const BackgroundPattern2 = ({ children }) => {
  const theme = useTheme();
  return (
    <Box
      component="span"
      sx={{
        display: 'flex',
        minHeight: '100%',
        height: '100vh',
        bgcolor: theme.palette.mode === 'dark' ? theme.palette.dark.dark : '#fff',
        backgroundImage: theme.palette.mode === 'dark' ? `url(${AuthPatternDark})` : `url(${AuthPattern})`,
        position: 'absolute',
        backgroundPosition: 'bottom left',
        backgroundRepeat: 'no-repeat',
        // backgroundSize: 'cover',
        overflow: 'hidden',
        m: '0 0 0 auto',
        p: '100px 0',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        '& > *': {
          position: 'relative',
          zIndex: 5
        },
        '&:after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1,
          bottom: 0,
          bgcolor: theme.palette.mode === 'dark' ? theme.palette.dark.dark : theme.palette.primary.light,
          opacity: theme.palette.mode === 'dark' ? 0.85 : 0.9
        }
      }}
    >
      {children}
    </Box>
  );
};

BackgroundPattern2.propTypes = {
  children: PropTypes.node
};

export default BackgroundPattern2;
