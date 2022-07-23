import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, FormControl, InputAdornment, MenuItem, Select, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

// ==============================|| FORM CONTROL SELECT ||============================== //

const FormControlSelect = ({ captionLabel, handleFilter, formState, iconPrimary, iconSecondary, selected, textPrimary, textSecondary }) => {
  const [now, setNow] = useState(new Date());
  const theme = useTheme();
  const IconPrimary = iconPrimary;
  const primaryIcon = iconPrimary ? <IconPrimary fontSize="small" sx={{ color: theme.palette.grey[700] }} /> : null;

  const IconSecondary = iconSecondary;
  const secondaryIcon = iconSecondary ? <IconSecondary fontSize="small" sx={{ color: theme.palette.grey[700] }} /> : null;

  var yearToNow = now;
  yearToNow.setFullYear(yearToNow.getFullYear() - 1);
  var monthToNow = now;
  monthToNow.setMonth(monthToNow.getMonth() - 1);
  var weekToNow = now;
  weekToNow.setDate(weekToNow.getDay() - 7);
  var dayToNow = now;
  dayToNow.setDate(weekToNow.getDay() - 1);
  var hourToNow = now;
  hourToNow.setHours(hourToNow.getHours() - 1);

  const filters = [
    {
      id: 0,
      title: <FormattedMessage id="all-time" />,
      query: ''
    },
    {
      id: 1,
      title: <FormattedMessage id="year" />,
      query: `?start_timestamp=0${yearToNow.getTime()}`
    },
    {
      id: 2,
      title: <FormattedMessage id="month" />,
      query: `?start_timestamp=0${monthToNow.getTime()}`
    },
    {
      id: 3,
      title: <FormattedMessage id="week" />,
      query: `?start_timestamp=0${weekToNow.getTime()}`
    },
    {
      id: 4,
      title: <FormattedMessage id="day" />,
      query: `?start_timestamp=0${dayToNow.getTime()}`
    },
    {
      id: 5,
      title: <FormattedMessage id="hour" />,
      query: `?start_timestamp=0${hourToNow.getTime()}`
    }
  ];

  const errorState = formState === 'error';
  const val = selected || '';

  // const [filter, setFilter] = useState(val);
  const [filter, setFilter] = useState(0);
  const handleChange = (event) => {
    event.preventDefault();
    setNow(Date.now());
    handleFilter(filters[event.target.value]);
    setFilter(event.target.value);
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
