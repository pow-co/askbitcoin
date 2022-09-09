import PropTypes from 'prop-types';
import Image from 'next/image';
import React from 'react';
import Link from 'Link';

import { FormattedMessage } from 'react-intl';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useConfig from 'hooks/useConfig';
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'components/ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Relayx = '/assets/images/icons/relayx.svg';
const Twetch = '/assets/images/icons/twetch.svg';
const HandCash = '/assets/images/icons/handcash.png';

import Script from 'next/script';

import { useRouter } from 'next/router';

// ============================|| RELAYX - LOGIN ||============================ //

const AuthLogin = ({ loginProp, ...others }) => {
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const { borderRadius } = useConfig();
  const [checked, setChecked] = React.useState(true);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const router = useRouter();

  const { relayxSignIn, twetchSignIn, handcashSignIn } = useAuth();

  const relayHandler = async () => {
    setIsSubmitting(true);
    try {
      let result = await relayxSignIn();

      console.log('relay.auth.result', result);
      setIsSubmitting(false);

      if (result.paymail) {
        router.push('/questions');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const twetchHandler = async () => {
    setIsSubmitting(true);
    try {
      let result = await twetchSignIn();

      console.log('twetch.auth.result', result);
      setIsSubmitting(false);

      if (result.paymail) {
        router.push('/questions');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handcashHandler = async () => {
    //TODO
    return;
    setIsSubmitting(true);
    try {
      let result = await handcashSignIn();

      console.log('handcash.auth.result', result);
      setIsSubmitting(false);

      if (result.paymail) {
        router.push('/questions');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Script src="https://one.relayx.io/relayone.js" />
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <AnimateButton>
            <Button
              disableElevation
              fullWidth
              onClick={relayHandler}
              size="large"
              variant="outlined"
              sx={{
                color: 'grey.700',
                backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.light + 20 : theme.palette.grey[100]
              }}
            >
              <Box sx={{ mr: { xs: 1, sm: 2 }, width: 20, height: 20, marginRight: matchDownSM ? 8 : 16 }}>
                <Image src={Relayx} alt="Ask Bitcoin Dashboard" layout="intrinsic" width="16px" height="16px" />
              </Box>
              <FormattedMessage id="connect-relayx" />
            </Button>
          </AnimateButton>
        </Grid>
        {/* <Grid item xs={12}>
          <AnimateButton>
            <Button
              disableElevation
              fullWidth
              onClick={twetchHandler}
              size="large"
              variant="outlined"
              sx={{
                color: 'grey.700',
                backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.light + 20 : theme.palette.grey[100]
              }}
            >
              <Box sx={{ mr: { xs: 1, sm: 2 }, width: 20, height: 20, marginRight: matchDownSM ? 8 : 16 }}>
                <Image src={Twetch} alt="Ask Bitcoin Dashboard" layout="intrinsic" width="16px" height="16px" />
              </Box>
              <FormattedMessage id="connect-twetch" />
            </Button>
          </AnimateButton>
        </Grid>
        <Grid item xs={12}>
          <AnimateButton>
            <Button
              disableElevation
              fullWidth
              onClick={handcashHandler}
              size="large"
              variant="outlined"
              sx={{
                color: 'grey.700',
                backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.light + 20 : theme.palette.grey[100]
              }}
            >
              <Box sx={{ mr: { xs: 1, sm: 2 }, width: 20, height: 20, marginRight: matchDownSM ? 8 : 16 }}>
                <Image src={HandCash} alt="Ask Bitcoin Dashboard" layout="intrinsic" width="16px" height="16px" />
              </Box>
              <FormattedMessage id="connect-handcash" />
            </Button>
          </AnimateButton>
        </Grid> */}
      </Grid>

      <Box sx={{ mt: 2 }}>
        <AnimateButton>
          <Button
            href="/questions"
            disableElevation
            disabled={isSubmitting}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="secondary"
          >
            <FormattedMessage id="skip-sign-in" />
          </Button>
        </AnimateButton>
      </Box>
    </>
  );
};

AuthLogin.propTypes = {
  loginProp: PropTypes.number
};

export default AuthLogin;
