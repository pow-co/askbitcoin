const products = [
  { id: '790841', name: 'Samsung TV 32” LED Retina', category: 'Television', price: 2500, date: '12.07.2018', qty: 5 },
  { id: '790842', name: 'Iphone 11 Pro Max', category: 'Television', price: 5000, date: '12.07.2018', qty: 2 },
  { id: '798699', name: 'Samsung TV 34” LED Retina', category: 'Television', price: 2500, date: '12.07.2018', qty: 5 },
  { id: '790752', name: 'Iphone 12 Pro Max', category: 'Television', price: 5000, date: '12.07.2018', qty: 2 },
  { id: '790955', name: 'Samsung TV 36” LED Retina', category: 'Television', price: 2500, date: '12.07.2018', qty: 5 },
  { id: '790785', name: 'Iphone 13 Pro Max', category: 'Television', price: 5000, date: '12.07.2018', qty: 2 },
  { id: '800837', name: 'Samsung TV 38” LED Retina', category: 'Television', price: 2500, date: '12.07.2018', qty: 5 },
  { id: '810365', name: 'Iphone 14 Pro Max', category: 'Television', price: 5000, date: '12.07.2018', qty: 2 },
  { id: '810814', name: 'Samsung TV 40” LED Retina', category: 'Television', price: 2500, date: '12.07.2018', qty: 5 },
  { id: '820385', name: 'Iphone 15 Pro Max', category: 'Television', price: 5000, date: '12.07.2018', qty: 2 },
  { id: '820885', name: 'Samsung TV 42” LED Retina', category: 'Television', price: 2500, date: '12.07.2018', qty: 5 },
  { id: '830390', name: 'Iphone 16 Pro Max', category: 'Television', price: 5000, date: '12.07.2018', qty: 2 },
  { id: '830879', name: 'Samsung TV 44” LED Retina', category: 'Television', price: 2500, date: '12.07.2018', qty: 5 },
  { id: '900111', name: 'Iphone 17 Pro Max', category: 'Television', price: 5000, date: '12.07.2018', qty: 2 },
  { id: '900836', name: 'Samsung TV 46” LED Retina', category: 'Television', price: 2500, date: '12.07.2018', qty: 5 },
  { id: '900112', name: 'Iphone 18 Pro Max', category: 'Television', price: 5000, date: '12.07.2018', qty: 2 },
  { id: '900871', name: 'Samsung TV 48” LED Retina', category: 'Television', price: 2500, date: '12.07.2018', qty: 5 },
  { id: '910232', name: 'Iphone 19 Pro Max', category: 'Television', price: 5000, date: '12.07.2018', qty: 2 },
  { id: '910886', name: 'Samsung TV 50” LED Retina', category: 'Television', price: 2500, date: '12.07.2018', qty: 5 },
  { id: '910232', name: 'Iphone 20 Pro Max', category: 'Television', price: 5000, date: '12.07.2018', qty: 2 }
];

export default function handler(req, res) {
  return res.status(200).json({ products });
}
