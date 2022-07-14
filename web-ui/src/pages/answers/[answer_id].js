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

// ==============================|| QUESTION DETAIL PAGE ||============================== //

const AnswerDetailPage = () => {
  const { query } = useRouter();

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

  return (
    <>
      <h1>Question</h1>
      <MainCard>
        <Post post={question} />
      </MainCard>
      <h2>Answer</h2>
      <Post answer post={answer} />
      <FormControl placeholder="Comment this answer" />
    </>
  );
};
AnswerDetailPage.Layout = 'authGuard';
export default AnswerDetailPage;
