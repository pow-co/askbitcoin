import React from 'react';

// material-ui
import { Button, Collapse, FormControlLabel, Grid, Radio, RadioGroup, Stack, TextField, Typography } from '@mui/material';

// third-party
import NumberFormat from 'react-number-format';

// project imports
import { gridSpacing } from 'store/constant';
import AnimateButton from 'components/ui-component/extended/AnimateButton';

// assets
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone';
import CreditCardTwoToneIcon from '@mui/icons-material/CreditCardTwoTone';

function limit(val, max) {
  if (val.length === 1 && val[0] > max[0]) {
    val = `0${val}`;
  }

  if (val.length === 2) {
    if (Number(val) === 0) {
      val = '01';
      // this can happen when user paste number
    } else if (val > max) {
      val = max;
    }
  }

  return val;
}

function cardExpiry(val) {
  const month = limit(val.substring(0, 2), '12');
  const date = limit(val.substring(2, 4), '31');

  const dateFmt = date.length ? `/${date}` : '';

  return `${month}${dateFmt}`;
}

// ==============================|| PROFILE 2 - PAYMENT ||============================== //

const Payment = () => {
  const [cvv, setCvv] = React.useState('123');
  const handleChangeCVV = (event) => {
    setCvv(event.target.value);
  };

  const [value1, setValue1] = React.useState('visa');
  const handleChange1 = (event) => {
    setValue1(event.target.value);
  };

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <RadioGroup aria-label="gender" name="gender1" value={value1} onChange={handleChange1}>
          <Grid container spacing={0}>
            <Grid item>
              <FormControlLabel value="visa" control={<Radio />} label="Visa Credit/Debit Card" />
            </Grid>
            <Grid item>
              <FormControlLabel value="paypal" control={<Radio />} label="PayPal" />
            </Grid>
          </Grid>
        </RadioGroup>
      </Grid>
      <Collapse in={value1 === 'visa'} sx={{ width: '100%' }}>
        {value1 === 'visa' && (
          <Grid item xs={12} sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Name on Card" defaultValue="Selena Litten" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <NumberFormat
                  defaultValue={4012888888881881}
                  format="#### #### #### ####"
                  prefix=""
                  fullWidth
                  customInput={TextField}
                  label="Card Number"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <NumberFormat format={cardExpiry} label="Expiry Date" fullWidth customInput={TextField} defaultValue="1022" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField id="standard-select-ccv" label="CCV Code" value={cvv} fullWidth onChange={handleChangeCVV} />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <LockTwoToneIcon sx={{ width: 50, height: 50, color: 'primary.main' }} />
                  </Grid>
                  <Grid item sm zeroMinWidth>
                    <Typography variant="h5">Secure Checkout</Typography>
                    <Typography variant="caption">Secure by Google.</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" justifyContent="flex-start">
                  <AnimateButton>
                    <Button variant="outlined" size="large" startIcon={<CreditCardTwoToneIcon />}>
                      Add New card
                    </Button>
                  </AnimateButton>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Collapse>
      <Collapse in={value1 === 'paypal'} sx={{ width: '100%' }}>
        {value1 === 'paypal' && (
          <Grid item xs={12} sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField fullWidth label="Paypal Mail" defaultValue="demo@company.paypal.com" />
              </Grid>
            </Grid>
          </Grid>
        )}
      </Collapse>
    </Grid>
  );
};

export default Payment;
