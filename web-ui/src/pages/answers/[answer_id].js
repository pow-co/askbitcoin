// material-ui
import { Typography } from '@mui/material';

import Link from 'next/link';

// project imports
import MainCard from 'components/ui-component/cards/MainCard';
import Post from 'components/ui-component/cards/Post';
import FormControl from 'components/ui-component/extended/Form/FormControl';

import { useAPI } from 'hooks/useAPI';

import { useRouter } from 'next/router';

import { FormattedMessage } from 'react-intl';
import { useSnackbar } from 'notistack';

// ==============================|| QUESTION DETAIL PAGE ||============================== //

import { useEvents } from 'hooks/useEvents';
import useAuth from 'hooks/useAuth';

const AnswerDetailPage = () => {
  window.postAnswer = postAnswer;
  const { user, isLoggedIn } = useAuth()

  const { query } = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  function postAnswer(question_tx_id, content) {
    const json = JSON.stringify({
      question_tx_id,
      content
    });

    if(!isLoggedIn){
      enqueueSnackbar('Please, Log In', {
        anchorOrigin: {
          vertical: 'top',
          horizontal:'center'
        },
        variant:'error'
      })
      return
    }
  
    relayone
      .send({
        opReturn: ['onchain', '1HWaEAD5TXC2fWHDiua9Vue3Mf8V1ZmakN', 'answer', json],
        currency: 'USD',
        amount: 0.01,
        to: '1HWaEAD5TXC2fWHDiua9Vue3Mf8V1ZmakN'
      })
      .then(console.log)
      .catch(console.error);
  }

  function onAnswer(answer) {
    console.log('on answer', answer);
    enqueueSnackbar(`new answer: ${answer.content}`);
  }

  let { data, error, refresh, loading } = useAPI(`/answers/${query.answer_id}`);

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
  console.log({ data });

  const { question, answer } = data;

  //const events = useEvents(`answers.${query.answer_id}.question`, onAnswer);

  //window.events = events;

  return (
    <MainCard>
      <h1>Answer</h1>
      <Post answer post={answer} />
      <h2>Question</h2>
      <Post post={question} />
      <FormControl question={question.tx_id} submit={postAnswer} placeholder="Answer this question" />
    </MainCard>
  );
};
AnswerDetailPage.Layout = 'authGuard';
export default AnswerDetailPage;
