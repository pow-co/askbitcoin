import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, FormControl, InputAdornment, MenuItem, Select, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

// ==============================|| FORM CONTROL SELECT ||============================== //

const filters = [
  {
    id: 0,
    title: <FormattedMessage id="all-time" />,
    startTimeStamp: '',
    stopTimeStamp: ''
  },
  {
    id: 1,
    title: <FormattedMessage id="year" />,
    startTimeStamp: '',
    stopTimeStamp: ''
  },
  {
    id: 2,
    title: <FormattedMessage id="month" />,
    startTimeStamp: '',
    stopTimeStamp: ''
  },
  {
    id: 3,
    title: <FormattedMessage id="week" />,
    startTimeStamp: '',
    stopTimeStamp: ''
  },
  {
    id: 4,
    title: <FormattedMessage id="day" />,
    startTimeStamp: '',
    stopTimeStamp: ''
  },
  {
    id: 5,
    title: <FormattedMessage id="hour" />,
    startTimeStamp: '',
    stopTimeStamp: ''
  }
];

const FormControlSelect = ({ captionLabel, formState, iconPrimary, iconSecondary, selected, textPrimary, textSecondary }) => {
  const theme = useTheme();
  const IconPrimary = iconPrimary;
  const primaryIcon = iconPrimary ? <IconPrimary fontSize="small" sx={{ color: theme.palette.grey[700] }} /> : null;

  const IconSecondary = iconSecondary;
  const secondaryIcon = iconSecondary ? <IconSecondary fontSize="small" sx={{ color: theme.palette.grey[700] }} /> : null;

  const errorState = formState === 'error';
  const val = selected || '';

  // const [filter, setFilter] = useState(val);
  const [filter, setFilter] = useState(0);
  const handleChange = (event) => {
    if (event.target.value) setFilter(event.target.value);
  };

  return (
    <FormControl error={errorState}>
      <Select
        id="outlined-select-filter"
        variant="standard"
        disableUnderline
        label={captionLabel}
        value={filter}
        onChange={handleChange}
        /* InputProps={{
          startAdornment: (
            <>
              {primaryIcon && <InputAdornment position="start">{primaryIcon}</InputAdornment>}
              {textPrimary && (
                <>
                  <InputAdornment position="start">{textPrimary}</InputAdornment>
                  <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                </>
              )}
            </>
          ),
          endAdornment: (
            <>
              {secondaryIcon && <InputAdornment position="end">{secondaryIcon}</InputAdornment>}
              {textSecondary && (
                <>
                  <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                  <InputAdornment position="end">{textSecondary}</InputAdornment>
                </>
              )}
            </>
          )
        }} */
      >
        {filters.map((option, index) => (
          <MenuItem key={index} value={option.id}>
            <Typography variant="h3" color="primary">
              {option.title}
            </Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

FormControlSelect.propTypes = {
  captionLabel: PropTypes.string,
  filters: PropTypes.array,
  formState: PropTypes.string,
  iconPrimary: PropTypes.object,
  iconSecondary: PropTypes.object,
  selected: PropTypes.string,
  textPrimary: PropTypes.string,
  textSecondary: PropTypes.string
};

export default FormControlSelect;
