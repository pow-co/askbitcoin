// material-ui
import { Typography } from '@mui/material';

// project imports
import MainCard from 'components/ui-component/cards/MainCard';

import { useAPI } from 'hooks/useAPI';

import { useRouter } from 'next/router'


// ==============================|| SAMPLE PAGE ||============================== //

const SamplePage = () => {
  const { query } = useRouter()

  let { data, error, refresh, loading } = useAPI(`/questions/${query.question_id}`)

  console.log({ data, error, refresh, loading })

  if (error) {
    console.log('ERROR', error)
    return <p>Error</p>
  }

  if (loading && !data) {
    return <p>Loading...</p>
  }
  console.log({data})


  const { question, answers } = data


  return (
    <>
    <h1>Question</h1>
    <MainCard title={question.value.content}>
      <Typography variant="body2">
        {question.author ? `Author: ${question.author}` : 'Anonymous Author'}
      </Typography>
    </MainCard>
    <h2>Answers</h2>
    {answers.map(answer => {

      return (<MainCard title={answer.value.content}>
        <Typography variant="body2">
          {answer.author ? `Author: ${answer.author}` : 'Anonymous Author'}
        </Typography>
      </MainCard>)
    })}
    </>
  )
};
SamplePage.Layout = 'authGuard';
export default SamplePage;
