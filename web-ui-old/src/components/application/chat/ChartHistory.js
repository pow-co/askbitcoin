import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef } from 'react';

// material-ui
import { Card, CardContent, Grid, Typography } from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';

// ==============================|| CHAT MESSAGE HISTORY ||============================== //

const ChartHistory = ({ data, theme, user }) => {
  // scroll to bottom when new message is sent or received
  const wrapper = useRef(document.createElement('div'));
  const el = wrapper.current;
  const scrollToBottom = useCallback(() => {
    el.scrollIntoView(false);
  }, [el]);

  useEffect(() => {
    scrollToBottom();
  }, [data.length, scrollToBottom]);

  return (
    <Grid item xs={12}>
      <Grid container spacing={gridSpacing} ref={wrapper}>
        {data.map((history, index) => (
          <React.Fragment key={index}>
            {history.from !== user.name ? (
              <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                  <Grid item xs={2} />
                  <Grid item xs={10}>
                    <Card
                      sx={{
                        display: 'inline-block',
                        float: 'right',
                        bgcolor: theme.palette.mode === 'dark' ? 'grey.600' : theme.palette.primary.light
                      }}
                    >
                      <CardContent sx={{ p: 2, pb: '16px !important', width: 'fit-content', ml: 'auto' }}>
                        <Grid container spacing={1}>
                          <Grid item xs={12}>
                            <Typography variant="body2" color={theme.palette.mode === 'dark' ? 'dark.900' : ''}>
                              {history.text}
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography align="right" variant="subtitle2" color={theme.palette.mode === 'dark' ? 'dark.900' : ''}>
                              {history.time}
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                  <Grid item xs={12} sm={7}>
                    <Card
                      sx={{
                        display: 'inline-block',
                        float: 'left',
                        background: theme.palette.mode === 'dark' ? theme.palette.dark[900] : theme.palette.secondary.light
                      }}
                    >
                      <CardContent sx={{ p: 2, pb: '16px !important' }}>
                        <Grid container spacing={1}>
                          <Grid item xs={12}>
                            <Typography variant="body2">{history.text}</Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography align="right" variant="subtitle2">
                              {history.time}
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </React.Fragment>
        ))}
      </Grid>
    </Grid>
  );
};

ChartHistory.propTypes = {
  theme: PropTypes.object,
  data: PropTypes.array,
  user: PropTypes.object
};

export default ChartHistory;
