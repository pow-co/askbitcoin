import { filter } from 'lodash';

let subtotal;
let result;

export default function handler(req, res) {
  const { id, products } = req.body;
  result = filter(products, { itemId: id });
  subtotal = result[0].quantity * result[0].offerPrice;
  const newProducts = filter(products, (item) => item.itemId !== id);
  return res.status(200).json({ products: newProducts, subtotal });
}
