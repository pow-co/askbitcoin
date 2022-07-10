import PropTypes from 'prop-types';

// material-ui
import { Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';

// third-party
import CurrencyFormat from 'react-currency-format';

// project imports
import SubCard from 'components/ui-component/cards/SubCard';

// ==============================|| CHECKOUT CART - ORDER SUMMARY ||============================== //

const OrderSummary = ({ checkout }) => (
  <SubCard>
    <TableContainer>
      <Table sx={{ minWidth: 'auto' }} size="small" aria-label="simple table">
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography variant="subtitle1">Order Summary</Typography>
            </TableCell>
            <TableCell />
          </TableRow>
          <TableRow>
            <TableCell>Sub Total</TableCell>
            <TableCell align="right">
              <Typography variant="subtitle1">
                <CurrencyFormat
                  decimalScale={2}
                  fixedDecimalScale
                  value={checkout.subtotal}
                  displayType="text"
                  thousandSeparator
                  prefix="$"
                />
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Coupon Discount</TableCell>
            <TableCell align="right">
              <Typography variant="subtitle1">
                {checkout.discount <= 0 ? (
                  '-'
                ) : (
                  <CurrencyFormat
                    decimalScale={2}
                    fixedDecimalScale
                    value={checkout.discount}
                    displayType="text"
                    thousandSeparator
                    prefix="- $"
                  />
                )}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Shipping Charges</TableCell>
            <TableCell align="right">
              <Typography variant="subtitle1">
                {checkout.shipping <= 0 ? (
                  '-'
                ) : (
                  <CurrencyFormat
                    decimalScale={2}
                    fixedDecimalScale
                    value={checkout.shipping}
                    displayType="text"
                    thousandSeparator
                    prefix="+ $"
                  />
                )}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ borderBottom: 'none' }}>
              <Typography variant="subtitle1">Total</Typography>
            </TableCell>
            <TableCell align="right" sx={{ borderBottom: 'none' }}>
              <Typography variant="subtitle1">
                <CurrencyFormat decimalScale={2} fixedDecimalScale value={checkout.total} displayType="text" thousandSeparator prefix="$" />
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  </SubCard>
);

OrderSummary.propTypes = {
  checkout: PropTypes.object
};

export default OrderSummary;
