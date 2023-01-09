// material-ui
import {
  Avatar,
  Button,
  CardActions,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import MainCard from 'components/ui-component/cards/MainCard';

// assets
const Avatar1 = '/assets/images/users/avatar-1.png';
const Avatar2 = '/assets/images/users/avatar-2.png';
const Avatar3 = '/assets/images/users/avatar-3.png';
const Avatar4 = '/assets/images/users/avatar-4.png';

// table data
function createData(time, subTime, avatar, name, title, subtext) {
  return { time, subTime, avatar, name, title, subtext };
}

const rows = [
  createData(
    '12',
    'hours',
    Avatar1,
    'John Deo',
    '[#1183] Workaround for OS X selects printing bug',
    'Chrome fixed the bug several versions ago, thus rendering this...'
  ),
  createData(
    '16',
    'hours',
    Avatar2,
    'Jems Win',
    '[#1249] Vertically center carousel controls',
    'Try any carousel control and reduce the screen width below...'
  ),
  createData(
    '40',
    'hours',
    Avatar3,
    'Jeny Wiliiam',
    '[#1254] Inaccurate small pagination height',
    'The height of pagination elements is not consistent with...'
  ),
  createData(
    '12',
    'hours',
    Avatar4,
    'Jems Win',
    '[#1249] Vertically center carousel controls',
    'Try any carousel control and reduce the screen width below...'
  )
];

// ==========================|| DATA WIDGET - ACTIVE TICKETS CARD ||========================== //

const ActiveTickets = () => (
  <MainCard title="Active Tickets" content={false}>
    <CardContent>
      <TableContainer>
        <Table sx={{ minWidth: 560 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ pl: 3 }}>Due</TableCell>
              <TableCell>Name</TableCell>
              <TableCell sx={{ pr: 3 }}>Position</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow hover key={index}>
                <TableCell sx={{ pl: 3 }}>
                  <Typography align="left" component="div" variant="subtitle1">
                    {row.time}
                  </Typography>
                  <Typography align="left" component="div" variant="subtitle2">
                    {row.subTime}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Grid container spacing={2} alignItems="center" sx={{ flexWrap: 'nowrap' }}>
                    <Grid item>
                      <Avatar alt="User 1" src={row.avatar} />
                    </Grid>
                    <Grid item xs zeroMinWidth>
                      <Typography component="div" align="left" variant="subtitle1">
                        {row.name}
                      </Typography>
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell sx={{ pr: 3 }}>
                  <Typography align="left" component="div" variant="subtitle1">
                    {row.title}
                  </Typography>
                  <Typography align="left" component="div" variant="subtitle2">
                    {row.subtext}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </CardContent>
    <CardActions sx={{ justifyContent: 'flex-end' }}>
      <Button variant="text" size="small">
        View all Projects
      </Button>
    </CardActions>
  </MainCard>
);

export default ActiveTickets;
