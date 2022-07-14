import PropTypes from 'prop-types';
import { useState } from 'react';
import useAuth from 'hooks/useAuth';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Divider, Grid, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import MUIFormControl from '@mui/material/FormControl';
import Avatar from 'components/ui-component/extended/Avatar';

// ==============================|| FORM CONTROL ||============================== //

const FormControl = ({ captionLabel, formState, iconPrimary, iconSecondary, placeholder, textPrimary, textSecondary }) => {
  const [input, setInput] = useState('');
  const theme = useTheme();
  const { user } = useAuth();
  const IconPrimary = iconPrimary;
  const primaryIcon = iconPrimary ? <IconPrimary fontSize="small" sx={{ color: theme.palette.grey[700] }} /> : null;

  const IconSecondary = iconSecondary;
  const secondaryIcon = iconSecondary ? <IconSecondary fontSize="small" sx={{ color: theme.palette.grey[700] }} /> : null;

  const errorState = formState === 'error';

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = () => {
    console.log('coucou', input);
  };

  return (
    <MUIFormControl fullWidth sx={{ padding: '16px' }} error={errorState}>
      <Grid container>
        <Grid item xs={1} sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Avatar alt="User 1" src={user ? `https://bitpic.network/u/${user.email}` : 'https://bitpic.network/u/unknown'} />
        </Grid>
        <Grid item xs={11}>
          <OutlinedInput
            fullWidth
            value={input}
            onChange={handleChange}
            placeholder={placeholder}
            type="text"
            label={captionLabel}
            startAdornment={
              <>
                {primaryIcon && <InputAdornment position="start">{primaryIcon}</InputAdornment>}
                {textPrimary && (
                  <>
                    <InputAdornment position="start">{textPrimary}</InputAdornment>
                    <Divider sx={{ height: 28, m: 0.5, mr: 1.5 }} orientation="vertical" />
                  </>
                )}
              </>
            }
            endAdornment={
              <>
                {secondaryIcon && <InputAdornment position="end">{secondaryIcon}</InputAdornment>}
                {textSecondary && (
                  <>
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <InputAdornment position="end">{textSecondary}</InputAdornment>
                  </>
                )}
              </>
            }
          />
        </Grid>
      </Grid>
      {input.length > 0 && (
        <Grid container sx={{ pt: 2 }}>
          <Grid item xs={10} />
          <Grid item xs={2}>
            <Button fullWidth variant="contained" onClick={handleSubmit}>
              Send
            </Button>
          </Grid>
        </Grid>
      )}
    </MUIFormControl>
  );
};

FormControl.propTypes = {
  captionLabel: PropTypes.string,
  formState: PropTypes.string,
  iconPrimary: PropTypes.object,
  iconSecondary: PropTypes.object,
  placeholder: PropTypes.string,
  textPrimary: PropTypes.string,
  textSecondary: PropTypes.string
};

export default FormControl;
