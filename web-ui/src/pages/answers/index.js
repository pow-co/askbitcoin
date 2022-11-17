import { useState } from 'react';
// material-ui
import { Typography, Grid, Box, CardContent, Stack, Rating } from '@mui/material';

// project imports
import MainCard from 'components/ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import StarBorderTwoToneIcon from '@mui/icons-material/StarBorderTwoTone';
import RateReviewTwoToneIcon from '@mui/icons-material/RateReviewTwoTone';

import Link from 'next/link';

// ==============================|| ANSWER PAGE ||============================== //
import { useAPI } from 'hooks/useAPI';
import { FormattedMessage } from 'react-intl';
import Post from 'components/ui-component/cards/Post';
import FormControlSelect from 'components/ui-component/extended/Form/FormControlSelect';
import { useTimeframe } from 'contexts/TimeframeContext';

const AnswersPage = () => {
  const { startTimestamp } = useTimeframe();
  let { data, error, refresh, loading } = useAPI(`/answers?start_timestamp=${startTimestamp}`);
  //let { data, error, refresh, loading } = useAPI(`/answers?start_timestamp=0`);

  let { data: recent } = useAPI(`/recent/answers?start_timestamp=${startTimestamp}`);

  console.log({ data, error, refresh, loading });

  if (error) {
    console.log('ERROR', error);
    return <p>Error</p>;
  }

  if (loading || data === undefined || !data) {
    return (
      <p>
        <FormattedMessage id="loading" />
      </p>
    );
  }

  const { answers } = data;

  console.log({ data, answers });

  return (
    <>
      <MainCard title={<FormattedMessage id="answers-pow" />}>
        <Grid container sx={{ pb: '16px' }} spacing={1}>
          <Grid item xs={6}>
            <Typography align="right" variant="h2">
              <FormattedMessage id="answers-pow" />
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <FormControlSelect />
          </Grid>
        </Grid>
        <Stack direction="column" justifyContent="flex-end">
          {answers.map((answer) => {
            return <Post key={answer.tx_id} answer post={answer} />;
          })}
        </Stack>
      </MainCard>

      <MainCard>
        <Stack direction="column" justifyContent="flex-end">
          <Box sx={{ padding: '2em' }}>
            <Typography sx={{ p: '16px' }} align="center" variant="h2">
              Recent Answers
            </Typography>
          </Box>
          {recent?.answers &&
            recent.answers.map((answer) => {
              return <Post key={answer.id} post={answer} />;
            })}
        </Stack>
      </MainCard>
    </>
  );
};

AnswersPage.Layout = 'authGuard';
export default AnswersPage;
