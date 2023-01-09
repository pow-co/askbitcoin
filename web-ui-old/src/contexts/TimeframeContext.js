import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import useLocalStorage from 'hooks/useLocalStorage';
import moment from 'moment';

function ago(period) {
  return moment().subtract(1, period).unix() * 1000;
}

const TimeframeContext = createContext(undefined);
const timestamps = {
  'last-hour': ago('hour'),
  'last-day': ago('day'),
  'last-week': ago('week'),
  'last-month': ago('month'),
  'last-year': ago('year'),
  'all-time': 0
};

const TimeframeProvider = (props) => {
  const [period, setPeriod] = useLocalStorage(periodStorageKey, 'last-week');
  const [startTimestamp, setStartTimestamp] = useState(timestamps[period]);
  //const [endTimestamp, setEndTimestamp] = useState()

  useEffect(() => {
    setStartTimestamp(timestamps[period]);
  }, [period]);

  const value = useMemo(
    () => ({
      period,
      setPeriod,
      startTimestamp
    }),
    [period, setPeriod, startTimestamp]
  );

  return <TimeframeContext.Provider value={value} {...props} />;
};

const useTimeframe = () => {
  const context = useContext(TimeframeContext);
  if (context === undefined) {
    throw new Error('useTimeframe must be used within a TimeframeProvider');
  }
  return context;
};

export { TimeframeProvider, useTimeframe };

//
// Utils
//

const periodStorageKey = 'askbitcoin.period';
