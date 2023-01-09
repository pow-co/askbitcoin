import { useDispatch } from 'store';

// material-ui
import { Button, Grid, FormControl, FormControlLabel, FormHelperText, Radio, RadioGroup, Stack } from '@mui/material';

// project imports
import MainCard from 'components/ui-component/cards/MainCard';
import AnimateButton from 'components/ui-component/extended/AnimateButton';
import { openSnackbar } from 'store/slices/snackbar';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';

/**
 * 'Select your favorite color'
 * yup.string Expected 0 arguments, but got 1 */
const validationSchema = yup.object({
  color: yup.string().required('Color selection is required')
});

// ==============================|| FORM VALIDATION - RADIO GROUP FORMIK  ||============================== //

const RadioGroupForms = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      color: ''
    },
    validationSchema,
    onSubmit: () => {
      dispatch(
        openSnackbar({
          open: true,
          message: 'Radio - Submit Success',
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
    <MainCard title="Radio">
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item>
            <FormControl>
              <RadioGroup row aria-label="color" value={formik.values.color} onChange={formik.handleChange} name="color" id="color">
                <FormControlLabel
                  value="primary"
                  control={
                    <Radio
                      sx={{
                        color: 'primary.main',
                        '&.Mui-checked': { color: 'primary.main' }
                      }}
                    />
                  }
                  label="Primary"
                />
                <FormControlLabel
                  value="error"
                  control={
                    <Radio
                      sx={{
                        color: 'error.main',
                        '&.Mui-checked': { color: 'error.main' }
                      }}
                    />
                  }
                  label="Error"
                />
                <FormControlLabel
                  value="secondary"
                  control={
                    <Radio
                      sx={{
                        color: 'secondary.main',
                        '&.Mui-checked': { color: 'secondary.main' }
                      }}
                    />
                  }
                  label="Secondary"
                />
              </RadioGroup>
            </FormControl>
            {formik.errors.color && (
              <FormHelperText error id="standard-weight-helper-text-email-login">
                {' '}
                {formik.errors.color}{' '}
              </FormHelperText>
            )}
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="flex-end">
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
  );
};

export default RadioGroupForms;
