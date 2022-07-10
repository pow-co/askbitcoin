const orders = [
  { id: '790841', name: 'Joseph William 1', company: 'Toronto', type: 'Credit Card', qty: 2500, date: '12.07.2018', status: 3 },
  { id: '790842', name: 'Anshan Handgun 2', company: 'Toronto', type: 'Paytm', qty: 5000, date: '12.07.2018', status: 2 },
  { id: '798699', name: 'Larry Doe 3', company: 'Toronto', type: 'Net Banking', qty: 2500, date: '12.07.2018', status: 1 },
  { id: '790752', name: 'Sara Soudan 4', company: 'Toronto', type: 'Upi', qty: 5000, date: '12.07.2018', status: 1 },
  { id: '790955', name: 'Joseph William 5', company: 'Toronto', type: 'Credit Card', qty: 2500, date: '12.07.2018', status: 2 },
  { id: '790785', name: 'Anshan Handgun 6', company: 'Toronto', type: 'Upi', qty: 5000, date: '12.07.2018', status: 3 },
  { id: '800837', name: 'Larry Doe 7', company: 'Toronto', type: 'Paytm', qty: 2500, date: '12.07.2018', status: 3 },
  { id: '810365', name: 'Sara Soudan 8', company: 'Toronto', type: 'Net Banking', qty: 5000, date: '12.07.2018', status: 2 },
  { id: '810814', name: 'Sara Soudan 20', company: 'Toronto', type: 'Upi', qty: 2500, date: '12.07.2018', status: 1 },
  { id: '820385', name: 'Joseph William 9', company: 'Toronto', type: 'Net Banking', qty: 5000, date: '12.07.2018', status: 1 },
  { id: '820885', name: 'Anshan Handgun 10', company: 'Toronto', type: 'Credit Card', qty: 2500, date: '12.07.2018', status: 1 },
  { id: '830390', name: 'Larry Doe 11', company: 'Toronto', type: 'Paytm', qty: 5000, date: '12.07.2018', status: 2 },
  { id: '830879', name: 'Sara Soudan 12', company: 'Toronto', type: 'Upi', qty: 2500, date: '12.07.2018', status: 3 },
  { id: '900111', name: 'Joseph William 13', company: 'Toronto', type: 'Upi', qty: 5000, date: '12.07.2018', status: 3 },
  { id: '900836', name: 'Anshan Handgun 14', company: 'Toronto', type: 'Credit Card', qty: 2500, date: '12.07.2018', status: 2 },
  { id: '900112', name: 'Larry Doe 15', company: 'Toronto', type: 'Paytm', qty: 5000, date: '12.07.2018', status: 2 },
  { id: '900871', name: 'Sara Soudan 16', company: 'Toronto', type: 'Upi', qty: 2500, date: '12.07.2018', status: 1 },
  { id: '910232', name: 'Joseph William 17', company: 'Toronto', type: 'Upi', qty: 5000, date: '12.07.2018', status: 2 },
  { id: '910886', name: 'Anshan Handgun 18', company: 'Toronto', type: 'Credit Card', qty: 2500, date: '12.07.2018', status: 3 },
  { id: '910232', name: 'Larry Doe 19', company: 'Toronto', type: 'Net Banking', qty: 5000, date: '12.07.2018', status: 2 }
];

export default function handler(req, res) {
  return res.status(200).json({ orders });
}
