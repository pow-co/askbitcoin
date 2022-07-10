import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { useDispatch } from 'store';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Dialog, FormControl, FormControlLabel, IconButton, Grid, Radio, RadioGroup, Stack, TextField, Zoom } from '@mui/material';

// third-party
import { useFormik } from 'formik';

// project imports
import MainCard from 'components/ui-component/cards/MainCard';
import AnimateButton from 'components/ui-component/extended/AnimateButton';
import { openSnackbar } from 'store/slices/snackbar';
import { gridSpacing } from 'store/constant';

// assets
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';

const Transition = forwardRef((props, ref) => <Zoom ref={ref} {...props} />);

// ==============================|| CHECKOUT PAYMENT - ADD NEW CARDS ||============================== //

const AddPaymentCard = ({ open, handleClose }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      number: '',
      type: 'visa',
      expired: '',
      cvv: '',
      bank: '',
      method: ''
    },
    onSubmit: () => {
      handleClose();
      dispatch(
        openSnackbar({
          open: true,
          message: 'Payment Card Add Success',
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: false
        })
      );
    }
  });

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      sx={{
        '& .MuiDialog-paper': {
          p: 0
        }
      }}
    >
      {open && (
        <MainCard
          title="Add Payment Card"
          secondary={
            <IconButton onClick={handleClose} size="large">
              <HighlightOffTwoToneIcon fontSize="small" />
            </IconButton>
          }
        >
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <FormControl>
                  <RadioGroup row aria-label="type" value={formik.values.type} onChange={formik.handleChange} name="type" id="type">
                    <FormControlLabel
                      value="visa"
                      control={
                        <Radio
                          sx={{
                            color: theme.palette.primary.main,
                            '&.Mui-checked': { color: theme.palette.primary.main }
                          }}
                        />
                      }
                      label="Visa"
                    />
                    <FormControlLabel
                      value="mastercard"
                      control={
                        <Radio
                          sx={{
                            color: theme.palette.secondary.main,
                            '&.Mui-checked': { color: theme.palette.secondary.main }
                          }}
                        />
                      }
                      label="Mastercard"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth id="bank" name="bank" label="Bank" value={formik.values.bank} onChange={formik.handleChange} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="number"
                  name="number"
                  label="Card Number"
                  value={formik.values.number}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="expired"
                  name="expired"
                  label="Expiry Date"
                  value={formik.values.expired}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth id="cvv" name="cvv" label="CVV" value={formik.values.cvv} onChange={formik.handleChange} />
              </Grid>
              <Grid item xs={12}>
                <FormControl>
                  <RadioGroup row aria-label="method" value={formik.values.method} onChange={formik.handleChange} name="method" id="method">
                    <FormControlLabel
                      value="credit"
                      control={
                        <Radio
                          sx={{
                            color: theme.palette.primary.main,
                            '&.Mui-checked': { color: theme.palette.primary.main }
                          }}
                        />
                      }
                      label="Credit Card"
                    />
                    <FormControlLabel
                      value="Debit Card"
                      control={
                        <Radio
                          sx={{
                            color: theme.palette.secondary.main,
                            '&.Mui-checked': { color: theme.palette.secondary.main }
                          }}
                        />
                      }
                      label="debit"
                    />
                    <FormControlLabel
                      value="net-banking"
                      control={
                        <Radio
                          sx={{
                            color: theme.palette.secondary.main,
                            '&.Mui-checked': { color: theme.palette.secondary.main }
                          }}
                        />
                      }
                      label="Net Banking"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" spacing={1} justifyContent="flex-end">
                  <Button color="error" onClick={handleClose}>
                    Cancel
                  </Button>
                  <AnimateButton>
                    <Button variant="contained" type="submit">
                      Submit
                    </Button>
                  </AnimateButton>
                </Stack>
              </Grid>
            </Grid>
          </form>
        </MainCard>
      )}
    </Dialog>
  );
};

AddPaymentCard.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func
};

export default AddPaymentCard;
