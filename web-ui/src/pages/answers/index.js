// material-ui
import { Typography, Grid, CardContent, Stack, Rating } from '@mui/material';

// project imports
import MainCard from 'components/ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import StarBorderTwoToneIcon from '@mui/icons-material/StarBorderTwoTone';
import RateReviewTwoToneIcon from '@mui/icons-material/RateReviewTwoTone';

import Link from 'next/link'



// ==============================|| SAMPLE PAGE ||============================== //
import { useAPI } from 'hooks/useAPI';

const AnswersPage = () => {

  let { data, error, refresh, loading } = useAPI('/answers')

  console.log({ data, error, refresh, loading })

  if (error) {
    console.log('ERROR', error)
    return <p>Error</p>
  }

  if (loading && !data) {
    return <p>Loading...</p>
  }

  const { answers } = data

  console.log({ answers })

  return (

  <MainCard title="Questions with Most Proof of Work">

    <Stack direction="column" justifyContent="flex-end">

      {answers.map(answer => {
        return (
          <Link
            color="text.secondary"
            underline="always"
            href={`/questions/${answer.value.txid}`}
            sx={{ typography: 'body2', display: 'flex', alignItems: 'center' }}
          >
          <MainCard title={answer.value.content}>
            <Typography variant="body2">
              {answer.author ? `Author: ${answer.author}` : 'Anonymous Author'}
            </Typography>
          </MainCard>
          </Link>
        ) 
      })}
    </Stack>

  </MainCard>
  )
};

AnswersPage.Layout = 'authGuard';
export default AnswersPage;
