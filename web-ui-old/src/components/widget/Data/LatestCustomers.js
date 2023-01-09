// material-ui
import { Button, CardActions, CardMedia, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// third party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from 'components/ui-component/cards/MainCard';

// assets
const Flag1 = '/assets/images/widget/AUSTRALIA.jpg';
const Flag2 = '/assets/images/widget/BRAZIL.jpg';
const Flag3 = '/assets/images/widget/GERMANY.jpg';
const Flag4 = '/assets/images/widget/UK.jpg';
const Flag5 = '/assets/images/widget/USA.jpg';

// table data
function createData(image, subject, dept, date) {
  return { image, subject, dept, date };
}

const rows = [
  createData(Flag1, 'Germany', 'Angelina Jolly', '56.23%'),
  createData(Flag2, 'USA', 'John Deo', '25.23%'),
  createData(Flag3, 'Australia', 'Jenifer Vintage', '12.45%'),
  createData(Flag4, 'United Kingdom', 'Lori Moore', '8.65%'),
  createData(Flag5, 'Brazil', 'Allianz Dacron', '3.56%'),
  createData(Flag1, 'Australia', 'Jenifer Vintage', '12.45%'),
  createData(Flag3, 'USA', 'John Deo', '25.23%'),
  createData(Flag5, 'Australia', 'Jenifer Vintage', '12.45%'),
  createData(Flag2, 'United Kingdom', 'Lori Moore', '8.65%')
];

// =========================|| DATA WIDGET - LATEST CUSTOMERS CARD ||========================= //

const LatestCustomers = () => (
  <MainCard title="Latest Customers" content={false}>
    <PerfectScrollbar style={{ height: 345, padding: 0 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ pl: 3 }}>#</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right" sx={{ pr: 3 }}>
                Average
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow hover key={index}>
                <TableCell sx={{ pl: 3 }}>
                  <CardMedia component="img" image={row.image} title="image" sx={{ width: 30, height: 'auto' }} />
                </TableCell>
                <TableCell>{row.subject}</TableCell>
                <TableCell>{row.dept}</TableCell>
                <TableCell align="right" sx={{ pr: 3 }}>
                  {row.date}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </PerfectScrollbar>

    <Divider />
    <CardActions sx={{ justifyContent: 'flex-end' }}>
      <Button variant="text" size="small">
        View all Latest Customers
      </Button>
    </CardActions>
  </MainCard>
);

export default LatestCustomers;
