// material-ui
import { Typography, Button, Stack, Box, Grid} from '@mui/material';

import Link from 'next/link';

// project imports
import MainCard from 'components/ui-component/cards/MainCard';
import Answer from 'components/ui-component/cards/Post/Answer';
import Question from 'components/ui-component/cards/Post/Question';
import FormControl from 'components/ui-component/extended/Form/FormControl';
import FormControlSelect from 'components/ui-component/extended/Form/FormControlSelect';

import { useState } from 'react'

import { useAPI } from 'hooks/useAPI';

import { useRouter } from 'next/router';

import { FormattedMessage } from 'react-intl';
import { useSnackbar } from 'notistack';

// ==============================|| QUESTION DETAIL PAGE ||============================== //

import { useEvents } from 'hooks/useEvents';
import useAuth from 'hooks/useAuth';

const AnswerDetailPage = () => {
  window.postAnswer = postAnswer;
  const { user, wallet, isLoggedIn } = useAuth();

  const [queryParams, setQueryParams] = useState('');


  const router = useRouter();
  const query = router.query;

  const { enqueueSnackbar } = useSnackbar();

  let { data, error, refresh, loading } = useAPI(`/answers/${query.answer_id}`);

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

    enqueueSnackbar('Posting answer using your wallet...', {
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center'
      },
      variant: 'error'
    });

    try {
      switch (wallet) {
        case 'relayx':
          let result = await relayone.send({
            opReturn: ['onchain', '1HWaEAD5TXC2fWHDiua9Vue3Mf8V1ZmakN', 'answer', json],
            currency: 'USD',
            amount: 0.01,
            to: '1HWaEAD5TXC2fWHDiua9Vue3Mf8V1ZmakN'
          });
          let { amount, currency, identity, paymail, rawTx, satoshis, txid } = result;
          console.log(result);

          enqueueSnackbar(`Answer Posted by ${paymail}`, {
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


          /* let { data: postTransactionResponse } = await axios.post('https://askbitcoin.ai/api/v1/transactions', {
            transaction: rawTx
          });

          console.log('postTransactionResponse', postTransactionResponse); */

          //router.push(`/answers/${txid}`);
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
  //let { data: recent } = useAPI(`/recent/answers`);

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
  console.log({ data });

  const { answer } = data;

  const { question } = answer;




  //const events = useEvents(`answers.${query.answer_id}.question`, onAnswer);

  //window.events = events;

  const onChangeFilter = (filter) => {
    setQueryParams(filter.query);
  };


  return (
    <>
      <MainCard>
        <h1>Answer</h1>
        <Answer answer post={answer} />
      </MainCard>
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
      {data.question?.answers.map((answer) => {
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
AnswerDetailPage.Layout = 'authGuard';
export default AnswerDetailPage;
