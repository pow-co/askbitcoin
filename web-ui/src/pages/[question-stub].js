import { useState } from 'react';
// material-ui
import { Box, Typography, Grid, Button, Stack } from '@mui/material';

import Link from 'next/link';

import Head from 'next/head'

// project imports
import MainCard from 'components/ui-component/cards/MainCard';
import Post from 'components/ui-component/cards/Post';

import Answer from 'components/ui-component/cards/Post/Answer'
import Question from 'components/ui-component/cards/Post/Question'

import FormControl from 'components/ui-component/extended/Form/FormControl';
import FormControlSelect from 'components/ui-component/extended/Form/FormControlSelect';

import { useAPI } from 'hooks/useAPI';

import axios from 'hooks/useAPI'
import useAuth from 'hooks/useAuth';

import { useRouter } from 'next/router';

import { FormattedMessage } from 'react-intl';

import { useSnackbar } from 'notistack';

// ==============================|| QUESTION DETAIL PAGE ||============================== //

import { useEffect } from 'react';
import { useEvents } from 'hooks/useEvents';

const QuestionDetailPage = () => {
  const [queryParams, setQueryParams] = useState('');
  window.postAnswer = postAnswer;
  const { user, wallet, isLoggedIn } = useAuth();

  const router = useRouter();
  const query = router.query;

  const { enqueueSnackbar } = useSnackbar();

  console.log('question by stub', query)

  const events = useEvents(`questions.by-stub.${query['question-stub']}.answer`, onAnswer);

  let { data, error, refresh, loading } = useAPI(`/question-by-stub/${query['question-stub']}`, queryParams);

  async function postAnswer(question_tx_id, content) {
    const json = JSON.stringify({
      question_tx_id,
      content
    });

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
      switch (wallet) {
        case 'relayx':
          let result = await relayone.send({
            opReturn: ['onchain', '1HWaEAD5TXC2fWHDiua9Vue3Mf8V1ZmakN', 'answer', json],
            currency: 'USD',
            amount: 0.0218,
            to: '1MqPZFc31jUetZ5hxVtG4tijJSugAcSZCQ'
          });
          let { amount, currency, identity, paymail, rawTx, satoshis, txid } = result;
          console.log(result);

          enqueueSnackbar(`Answer Posted`, {
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

              await axios.get(`https://askbitcoin.ai/api/v1/answers/${txid}`);

              refresh()

            } catch (error) {

              console.error('api.answers.show.error', error);
            }
          })();

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
              let { data: postTransactionResponse } = await axios.post('https://askbitcoin.ai/api/v1/answers', {
                transaction: rawTx
              });

              console.log('postTransactionResponse', postTransactionResponse);
            } catch (error) {
              console.error('postTransactionResponse', error);
            }
          })();

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
      enqueueSnackbar(`Error Posting Answer: ${error.message}`, {
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center'
        },
        variant: 'error'
      });
    }
  }

  function onAnswer(answer) {
    console.log('on answer', answer);
    enqueueSnackbar(`new answer: ${answer.content}`);
  }

  let recent = [];
  //let { data: recent } = useAPI('/recent/answers');

  if (error) {
    console.error('ERROR', error);
    return <p>Error</p>;
  }

  if (!data) {
    return (
      <p>
        <FormattedMessage id="loading" />
      </p>
    );
  }

  const onChangeFilter = (filter) => {
    setQueryParams(filter.query);
  };

  const { question } = data;

  var { answers } = question;

  answers = answers.map((answer) => {
    return Object.assign(answer, {
      difficulty: answer.boostpow_proofs.reduce((sum, { difficulty }) => {
        return sum + difficulty;
      }, 0)
    });
  });

  answers = answers.sort((a, b) => (a.difficulty > b.difficulty ? 1 : -1));

  return (
    <>
      <Head>
        <meta name="title" content={`Ask Bitcoin - ${question.content}`} key="title"/>
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://askbitcoin.ai/${question.url_stub}`} key="og_url" />
        <meta property="og:title" content={`Ask Bitcoin - ${question.content}`} key="og_title"/>
        <meta
          property="og:description"
          content={`Top Answers Ranked by Proof of Work to the Question ${question.content}`}
        />
        <meta property="twitter:url" content={`https://askbitcoin.ai/${question.url_stub}`} key="twitter_url" />
        <meta property="twitter:title" content={`Ask Bitcoin - ${question.content}`} key="twitter_title" />
        <meta
          property="twitter:description"
          content={`Top Answers Ranked by Proof of Work to the Question ${question.content}`}
          key="twitter_description"
        />
      </Head>
      <MainCard>
        <Question post={question} />
        <FormControl question={question.tx_id} submit={postAnswer} placeholder="Add your answer" />
        <Grid container sx={{ pb: '16px' }} spacing={1}>
          <Grid item xs={6}>
            <Typography align="right" variant="h2">
              <FormattedMessage id="answers-pow" />
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <FormControlSelect handleFilter={onChangeFilter} />
          </Grid>
        </Grid>
        {answers.map((answer) => {
          return <Answer key={answer.tx_id} answer post={answer} />;
        })}
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
              return <Answer key={answer.id} post={answer} />;
            })}
        </Stack>
      </MainCard>
    </>
  );
};
QuestionDetailPage.Layout = 'authGuard';
export default QuestionDetailPage;
