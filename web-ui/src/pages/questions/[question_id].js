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

import { useSnackbar } from 'notistack'


// ==============================|| QUESTION DETAIL PAGE ||============================== //



import { useEffect } from 'react'
import { useEvents } from 'hooks/useEvents';

function postAnswer(question_tx_id, content) {

  const json = JSON.stringify({
    question_tx_id,
    content
  })

  relayone.send({
    "opReturn": ["onchain", "1HWaEAD5TXC2fWHDiua9Vue3Mf8V1ZmakN", "answer", json],
    "currency": "USD",
    "amount": 0.01,
    "to": "1HWaEAD5TXC2fWHDiua9Vue3Mf8V1ZmakN"
  }).then(console.log).catch(console.error)
}


const QuestionDetailPage = () => {

  window.postAnswer = postAnswer;

  const { query } = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  function onAnswer(answer) {
    console.log('on answer', answer)
    enqueueSnackbar(`new answer: ${answer.content}`)
}

  const events = useEvents(`questions.${query.question_id}.answer`, onAnswer)

  window.events = events


  let { data, error, refresh, loading } = useAPI(`/questions/${query.question_id}`);

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

  const { question, answers } = data;

  return (
    <>
      <h1>Question</h1>
      <MainCard>
        <Post post={question} />
      </MainCard>
      <h2>Answers</h2>
      <FormControl placeholder="Add your answer" />
      {answers.map((answer) => {
        return <Post key={answer.tx_id} answer post={answer} />;
      })}
    </>
  );
};
QuestionDetailPage.Layout = 'authGuard';
export default QuestionDetailPage;
