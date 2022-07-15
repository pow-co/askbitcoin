// material-ui
import { Typography, Grid, CardContent, Stack, Rating } from '@mui/material';

// project imports
import MainCard from 'components/ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import StarBorderTwoToneIcon from '@mui/icons-material/StarBorderTwoTone';
import RateReviewTwoToneIcon from '@mui/icons-material/RateReviewTwoTone';

import Link from 'next/link';

// ==============================|| QUESTION PAGE ||============================== //
import { useAPI } from 'hooks/useAPI';
import useAuth from 'hooks/useAuth';
import { FormattedMessage } from 'react-intl';
import Post from 'components/ui-component/cards/Post';
import FormControl from 'components/ui-component/extended/Form/FormControl';
import Avatar from 'components/ui-component/extended/Avatar';

import { useSnackbar } from 'notistack';
import { useEvents } from 'hooks/useEvents';

import { useRouter } from 'next/router';
import axios from 'utils/axios'


const QuestionPage = () => {
  window.postQuestion = postQuestion;

  const router = useRouter();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  async function postQuestion(content) {

    try {

    console.log('postQuestion', content)

    enqueueSnackbar(`Posting Question: ${content}`, {
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center'
      },
      variant: 'info'
    })
  
    let result = await relayone.send({
        opReturn: ['onchain', '1HWaEAD5TXC2fWHDiua9Vue3Mf8V1ZmakN', 'question', JSON.stringify({
          content
        })],
        currency: 'USD',
        amount: 0.01,
        to: '1HWaEAD5TXC2fWHDiua9Vue3Mf8V1ZmakN'
      })

    let {
      amount,
      currency,
      identity,
      paymail,
      rawTx,
      satoshis,
      txid
    } = result

    enqueueSnackbar(`Question Posted by ${paymail}`, {
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center'
      },
      variant: 'success'
    })

        let { data: postTransactionResponse } = await axios.post('/api/v1/transactions', {
          transaction: rawTx
        })

        console.log('postTransactionResponse', postTransactionResponse);

        router.push(`/questions/${txid}`)
      } catch(error) {
        enqueueSnackbar(`Error Posting Question: ${error.message}`, {
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center'
          },
          variant: 'error'
        })
      }

  }

  function onQuestion(question) {
    console.log('on question', question);
    enqueueSnackbar(`new question: ${question.content}`);
  }

  const events = useEvents(`questions`, onQuestion);

  window.events = events;

  const { user } = useAuth();
  let { data, error, refresh, loading } = useAPI('/questions');

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

  const { questions } = data;

  return (
    <MainCard title={<FormattedMessage id="questions-pow" />}>
      <FormControl submit={postQuestion} placeholder="Ask Bitcoin a question" />
      <Stack direction="column" justifyContent="flex-end">
        {questions.map((question) => {
          return <Post key={question.id} post={question} />;
        })}
      </Stack>
    </MainCard>
  );
};

QuestionPage.Layout = 'authGuard';
export default QuestionPage;
