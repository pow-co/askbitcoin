import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, FormControl, InputAdornment, MenuItem, Select, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { useRouter } from 'next/router';

import moment from 'moment'

// ==============================|| FORM CONTROL SELECT ||============================== //



const FormControlSelect = ({ captionLabel, handleFilter, formState, iconPrimary, iconSecondary, selected, period }) => {
  const [now, setNow] = useState(new Date());
  const theme = useTheme();
  const IconPrimary = iconPrimary;
  const primaryIcon = iconPrimary ? <IconPrimary fontSize="small" sx={{ color: theme.palette.grey[700] }} /> : null;

  const IconSecondary = iconSecondary;
  const secondaryIcon = iconSecondary ? <IconSecondary fontSize="small" sx={{ color: theme.palette.grey[700] }} /> : null;

  function ago(period) {
    return moment(now).subtract(1, period).unix() * 1000
  }

  if (!period) {

    period = 'last-week'
  }

  const router = useRouter()

  const filters = [
    {
      id: 0,
      title: <FormattedMessage id="all-time" />,
      query: '',
      name: 'all-time'
    },
    {
      id: 1,
      title: <FormattedMessage id="year" />,
      query: `?start_timestamp=${ago('year')}`,
      name: 'last-year'
    },
    {
      id: 2,
      title: <FormattedMessage id="month" />,
      query: `?start_timestamp=${ago('month')}`,
      name: 'last-month'
    },
    {
      id: 3,
      title: <FormattedMessage id="week" />,
      query: `?start_timestamp=${ago('week')}`,
      name: 'last-week'
    },
    {
      id: 4,
      title: <FormattedMessage id="day" />,
      query: `?start_timestamp=${ago('day')}`,
      name: 'last-day'
    },
    {
      id: 5,
      title: <FormattedMessage id="hour" />,
      query: `?start_timestamp=${ago('hour')}`,
      name: 'last-hour'
    }
  ];

  console.log('PERIOD', period)

  const filterIndex = filters.filter(f => f.name === period)[0]

  const errorState = formState === 'error';
  const val = selected || '';

  // const [filter, setFilter] = useState(val);
  var [filter, setFilter] = useState(filterIndex.id);
  const handleChange = (event) => {

    console.log('HANDLE CHANGE', event.target.value)
    event.preventDefault();
    //handleFilter(filters[event.target.value]);
    //setFilter(event.target.value);

    window.location = `/questions/${filters[event.target.value].name}`

  };

  console.log({ filter, filters})

  return (
    <FormControl error={errorState}>
      <Select
        id="outlined-select-filter"
        variant="standard"
        disableUnderline
        label={filter}
        value={filter}
        onChange={handleChange}
      >
        {filters.map((option, index) => (
          <MenuItem key={index} value={option.id} selected={filter === 0}>
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
