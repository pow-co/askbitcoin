import { useState } from 'react';
// material-ui
import { Typography, Grid, Button, CardContent, Stack, Rating, Box } from '@mui/material';

// project imports
import MainCard from 'components/ui-component/cards/MainCard';

// ==============================|| QUESTION PAGE ||============================== //
import { useAPI } from 'hooks/useAPI';
import useAuth from 'hooks/useAuth';
import { FormattedMessage } from 'react-intl';
import Post from 'components/ui-component/cards/Post';
import Question from 'components/ui-component/cards/Post/Question';
import FormControl from 'components/ui-component/extended/Form/FormControl';

import { useSnackbar } from 'notistack';
import { useEvents } from 'hooks/useEvents';
import FormControlSelect from 'components/ui-component/extended/Form/FormControlSelect';

import { useRouter } from 'next/router';
import axios from 'utils/axios';

import moment from 'moment';
import { useTimeframe } from 'contexts/TimeframeContext';

function ago(period) {
  return moment().subtract(1, period).unix() * 1000;
}

const QuestionPage = () => {
  const { user, wallet, isLoggedIn } = useAuth();
  const { period, setPeriod, startTimestamp } = useTimeframe();

  const router = useRouter();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  async function postQuestion(content) {
    if (!isLoggedIn) {
      enqueueSnackbar('Please, Log In', {
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center'
        },
        variant: 'error'
      });
      return;
    }

    try {
      console.log('postQuestion', content);

      enqueueSnackbar(`Posting Question: ${content}`, {
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center'
        },
        variant: 'info'
      });

      switch (wallet) {
        case 'relayx':
          let result = await relayone.send({
            opReturn: [
              'onchain',
              '1HWaEAD5TXC2fWHDiua9Vue3Mf8V1ZmakN',
              'question',
              JSON.stringify({
                content
              })
            ],
            currency: 'USD',
            amount: 0.0218,
            to: '1MqPZFc31jUetZ5hxVtG4tijJSugAcSZCQ'
          });
          let { amount, currency, identity, paymail, rawTx, satoshis, txid } = result;
          console.log(result);

          enqueueSnackbar(`Question successfully posted}`, {
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center'
            },
            variant: 'success',
            action: () => (
              <Button variant="text" href={`https://whatsonchain.com/tx/${txid}`}>
                View
              </Button>
            )
          });

          (async () => {
            try {
              let { data: postTransactionResponse } = await axios.post('https://askbitcoin.ai/api/v1/transactions', {
                transaction: rawTx
              });

              console.log('postTransactionResponse', postTransactionResponse);
            } catch (error) {
              console.error('postTransactionResponse', error);
            }
          })();

          (async () => {
            try {
              let { data: postTransactionResponse } = await axios.post('https://askbitcoin.ai/api/v1/questions', {
                transaction: rawTx
              });

              console.log('api.questsions.post.response', postTransactionResponse);

              router.push(`/questions/${txid}`);
            } catch (error) {
              console.error('api.questsions.post.response', error);
            }
          })();

          (async () => {
            try {
              let { data: postTransactionResponse } = await axios.post('https://pow.co/api/v1/transactions', {
                transaction: rawTx
              });

              console.log('powco_post_transaction_response', postTransactionResponse);
            } catch (error) {
              console.error('powco_post_transaction_response', error);
            }
          })();

          (async () => {
            try {
              let { data: postTransactionResponse } = await axios.post('https://pow.co/api/v1/jobs', {
                transaction: rawTx
              });

              console.log('powco_post_transaction_response', postTransactionResponse);
            } catch (error) {
              console.error('powco_post_transaction_response', error);
            }
          })();

          router.push(`/questions/${txid}`);

          break;
        case 'twetch':
          //TODO
          break;
        case 'handcash':
          //TODO
          break;
        default:
          console.error('No wallet selected');
          return;
      }
    } catch (error) {
      enqueueSnackbar(`Error Posting Question: ${error.message}`, {
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center'
        },
        variant: 'error'
      });
    }
  }
  window.postQuestion = postQuestion;

  function onQuestion(question) {
    console.log('on question', question);
    enqueueSnackbar(`new question: ${question.content}`);
  }

  const events = useEvents(`questions`, onQuestion);

  window.events = events;

  let { data, error, refresh, loading } = useAPI(`/questions?start_timestamp=${startTimestamp}`);

  let { data: recent } = useAPI(`/recent/questions`);

  console.log({ data, error, refresh, loading });

  if (error) {
    console.log('ERROR', error);
    return <p>Error</p>;
  }

  if (loading && !data) {
    return (
      <p>
        <FormattedMessage id="loading" />
      </p>
    );
  }

  const { questions } = data || [];

  return (
    <>
      <MainCard>
        <FormControl submit={postQuestion} placeholder="Ask Bitcoin a question" />
        <Grid container sx={{ pb: '16px' }} spacing={1}>
          <Grid item xs={6}>
            <Typography align="right" variant="h2">
              <FormattedMessage id="questions-pow" />
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <FormControlSelect />
          </Grid>
        </Grid>
        <Stack direction="column" justifyContent="flex-end">
          {questions &&
            questions.map((question) => {
              return <Question key={question.id} post={question} />;
            })}
        </Stack>
      </MainCard>

      <MainCard>
        <Stack direction="column" justifyContent="flex-end">
          <Box sx={{ padding: '2em' }}>
            <Typography sx={{ p: '16px' }} align="center" variant="h2">
              Recently Asked Questions
            </Typography>
          </Box>
          {recent?.questions &&
            recent.questions.map((question) => {
              return <Question key={question.id} post={question} />;
            })}
        </Stack>
      </MainCard>
    </>
  );
};

QuestionPage.Layout = 'authGuard';
export default QuestionPage;
