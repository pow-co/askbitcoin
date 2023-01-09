import { filter } from 'lodash';

let oldSubTotal;
let subtotal;
let latestProducts;
let result;

export default function handler(req, res) {
  const { id, quantity, products } = req.body;
  result = filter(products, { itemId: id });
  subtotal = quantity * result[0].offerPrice;
  oldSubTotal = 0;

  latestProducts = products.map((item) => {
    if (id === item.itemId) {
      oldSubTotal = item.quantity * (item.offerPrice || 0);
      return { ...item, quantity };
    }
    return item;
  });
  return res.status(200).json({ products: latestProducts, oldSubTotal, subtotal });
}
