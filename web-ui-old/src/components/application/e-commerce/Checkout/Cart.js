import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import Link from 'Link';
// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Button,
  ButtonGroup,
  Grid,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery
} from '@mui/material';

// third-party
import { sum } from 'lodash';
import CurrencyFormat from 'react-currency-format';

// project imports
import CartDiscount from './CartDiscount';
import ColorOptions from '../ColorOptions';
import OrderSummary from './OrderSummary';
import Avatar from 'components/ui-component/extended/Avatar';
import { gridSpacing } from 'store/constant';

// assets
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const prodImage = '/assets/images/e-commerce';

// product color select
function getColor(color) {
  return ColorOptions.filter((item) => item.value === color);
}

// ==============================|| CART - INCREMENT QUANTITY ||============================== //

const Increment = ({ itemId, quantity, updateQuantity }) => {
  const [value, setValue] = useState(quantity);

  const incrementHandler = () => {
    setValue(value - 1);
    updateQuantity(itemId, value - 1);
  };

  const decrementHandler = () => {
    setValue(value + 1);
    updateQuantity(itemId, value + 1);
  };

  return (
    <ButtonGroup size="large" variant="text" color="inherit" sx={{ border: '1px solid', borderColor: 'grey.400' }}>
      <Button key="three" disabled={value <= 1} onClick={incrementHandler} sx={{ pr: 0.75, pl: 0.75, minWidth: '0px !important' }}>
        <RemoveIcon fontSize="inherit" />
      </Button>
      <Button key="two" sx={{ pl: 0.5, pr: 0.5 }}>
        {value}
      </Button>
      <Button key="one" onClick={decrementHandler} sx={{ pl: 0.75, pr: 0.75, minWidth: '0px !important' }}>
        <AddIcon fontSize="inherit" />
      </Button>
    </ButtonGroup>
  );
};

Increment.propTypes = {
  itemId: PropTypes.number,
  quantity: PropTypes.number,
  updateQuantity: PropTypes.func
};

// ==============================|| CART - MAIN ||============================== //

const Cart = ({ checkout, onNext, removeProduct, updateQuantity }) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));
  const totalQuantity = sum(checkout.products.map((item) => item.quantity));
  const [rows, setRows] = useState(checkout.products);

  useEffect(() => {
    setRows(checkout.products);
  }, [checkout.products]);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="subtitle1">Cart Item</Typography>
          <Typography variant="caption" sx={{ fontSize: '0.875rem' }}>
            ({totalQuantity})
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead
              sx={{
                borderTop: '1px solid',
                color: theme.palette.mode === 'dark' ? theme.palette.dark.light + 15 : 'grey.200'
              }}
            >
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right" />
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => {
                const colorsData = row.color ? getColor(row.color) : false;
                return (
                  <TableRow key={index} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      <Grid container alignItems="center" spacing={2}>
                        <Grid item>
                          <Avatar size="md" variant="rounded" src={row.image ? `${prodImage}/${row.image}` : ''} />
                        </Grid>
                        <Grid item>
                          <Stack spacing={0}>
                            <Typography variant="subtitle1">{row.name}</Typography>
                            <Stack direction="row" alignItems="center" spacing={1}>
                              <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                                Size:{' '}
                                <Typography variant="caption" component="span">
                                  {row.size}
                                </Typography>
                              </Typography>
                              <Typography variant="caption" sx={{ fontSize: '1rem' }}>
                                |
                              </Typography>

                              <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                                Color:{' '}
                                <Typography variant="caption" component="span">
                                  {colorsData ? colorsData[0].label : 'Multicolor'}
                                </Typography>
                              </Typography>
                            </Stack>
                          </Stack>
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell align="right">
                      <Stack>
                        <Typography variant="subtitle1">
                          <CurrencyFormat
                            decimalScale={2}
                            fixedDecimalScale
                            value={row.offerPrice}
                            displayType="text"
                            thousandSeparator
                            prefix="$"
                          />
                        </Typography>
                        <Typography variant="caption" sx={{ textDecoration: 'line-through' }}>
                          <CurrencyFormat
                            decimalScale={2}
                            fixedDecimalScale
                            value={row.salePrice}
                            displayType="text"
                            thousandSeparator
                            prefix="$"
                          />
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="right">
                      <Increment quantity={row.quantity} itemId={row.itemId} updateQuantity={updateQuantity} />
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="subtitle1">
                        <CurrencyFormat
                          decimalScale={2}
                          fixedDecimalScale
                          value={row.offerPrice * row.quantity}
                          displayType="text"
                          thousandSeparator
                          prefix="$"
                        />
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => removeProduct(row.itemId)} size="large">
                        <DeleteTwoToneIcon sx={{ color: 'grey.500' }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12}>
        <OrderSummary checkout={checkout} />
      </Grid>
      <Grid item xs={12}>
        <Grid direction={matchDownMD ? 'column-reverse' : 'row'} container spacing={3} alignItems={matchDownMD ? '' : 'center'}>
          <Grid item xs={12} md={7} lg={8}>
            <Button component={Link} href="/app/e-commerce/products" variant="text" startIcon={<KeyboardBackspaceIcon />}>
              Continue Shopping
            </Button>
          </Grid>
          <Grid item xs={12} md={5} lg={4}>
            <Stack spacing={gridSpacing}>
              <CartDiscount />
              <Button variant="contained" fullWidth onClick={onNext}>
                Check Out
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

Cart.propTypes = {
  checkout: PropTypes.object,
  updateQuantity: PropTypes.func,
  removeProduct: PropTypes.func,
  onNext: PropTypes.func
};

export default Cart;
