import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, FormControl, InputAdornment, MenuItem, Select, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { useRouter } from 'next/router';

import moment from 'moment';

import { useTimeframe } from 'contexts/TimeframeContext';

// ==============================|| FORM CONTROL SELECT ||============================== //

const FormControlSelect = ({ captionLabel, handleFilter, formState, iconPrimary, iconSecondary, selected }) => {
  const { period, setPeriod } = useTimeframe();
  const theme = useTheme();

  const IconPrimary = iconPrimary;
  const primaryIcon = iconPrimary ? <IconPrimary fontSize="small" sx={{ color: theme.palette.grey[700] }} /> : null;

  const IconSecondary = iconSecondary;
  const secondaryIcon = iconSecondary ? <IconSecondary fontSize="small" sx={{ color: theme.palette.grey[700] }} /> : null;

  const router = useRouter();

  const filters = [
    {
      id: 0,
      title: <FormattedMessage id="all-time" />,
      name: 'all-time'
    },
    {
      id: 1,
      title: <FormattedMessage id="year" />,
      name: 'last-year'
    },
    {
      id: 2,
      title: <FormattedMessage id="month" />,
      name: 'last-month'
    },
    {
      id: 3,
      title: <FormattedMessage id="week" />,
      name: 'last-week'
    },
    {
      id: 4,
      title: <FormattedMessage id="day" />,
      name: 'last-day'
    },
    {
      id: 5,
      title: <FormattedMessage id="hour" />,
      name: 'last-hour'
    }
  ];

  console.log('PERIOD', period);

  const filterIndex = filters.filter((f) => f.name === period)[0];

  const errorState = formState === 'error';
  const val = selected || '';

  // const [filter, setFilter] = useState(val);
  var [filter, setFilter] = useState(filterIndex.id);
  const handleChange = (event) => {
    console.log('HANDLE CHANGE', event.target.value);
    //event.preventDefault();
    setFilter(filterIndex.id);
    setPeriod(filters[event.target.value].name);
    //handleFilter(filters[event.target.value]);
    //setFilter(event.target.value);

    //window.location = `/questions/${filters[event.target.value].name}`;
  };

  console.log({ filter, filters });

  return (
    <FormControl error={errorState}>
      <Select id="outlined-select-filter" variant="standard" disableUnderline label={filter} value={filter} onChange={handleChange}>
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
