const productreviews = [
  {
    name: 'Apple Watch Series 1',
    author: 'Joseph William',
    review: 'The Series 4 is a significant step...',
    rating: 3.5,
    date: '12.07.2018',
    status: 1
  },
  {
    name: 'Apple X2 2',
    author: 'Anshan Handgun',
    review: 'The Series 4 is a significant step...',
    rating: 5.0,
    date: '12.07.2018',
    status: 2
  },
  {
    name: 'Apple Watch Series 3',
    author: 'Larry Doe',
    review: 'The Series 4 is a significant step...',
    rating: 4.5,
    date: '12.07.2018',
    status: 2
  },
  {
    name: 'Apple Watch Series 4',
    author: 'Joseph William',
    review: 'The Series 4 is a significant step...',
    rating: 3.0,
    date: '12.07.2018',
    status: 3
  },
  {
    name: 'Apple X2 5',
    author: 'Anshan Handgun',
    review: 'The Series 4 is a significant step...',
    rating: 2.0,
    date: '12.07.2018',
    status: 2
  },
  {
    name: 'Apple X2 6',
    author: 'Larry Doe',
    review: 'The Series 4 is a significant step...',
    rating: 2.5,
    date: '12.07.2018',
    status: 1
  },
  {
    name: 'Apple Watch Series 7',
    author: 'Joseph William',
    review: 'The Series 4 is a significant step...',
    rating: 4.0,
    date: '12.07.2018',
    status: 3
  },
  {
    name: 'Apple X2 8',
    author: 'Anshan Handgun',
    review: 'The Series 4 is a significant step...',
    rating: 5.0,
    date: '12.07.2018',
    status: 3
  },
  {
    name: 'Apple Watch Series 9',
    author: 'Larry Doe',
    review: 'The Series 4 is a significant step...',
    rating: 4.0,
    date: '12.07.2018',
    status: 1
  },
  {
    name: 'Apple Watch Series 10',
    author: 'Joseph William',
    review: 'The Series 4 is a significant step...',
    rating: 3.5,
    date: '12.07.2018',
    status: 2
  },
  {
    name: 'Apple X2 11',
    author: 'Anshan Handgun',
    review: 'The Series 4 is a significant step...',
    rating: 1.0,
    date: '12.07.2018',
    status: 1
  },
  {
    name: 'Apple X2 12',
    author: 'Larry Doe',
    review: 'The Series 4 is a significant step...',
    rating: 1.5,
    date: '12.07.2018',
    status: 1
  },
  {
    name: 'Apple Watch Series 13',
    author: 'Joseph William',
    review: 'The Series 4 is a significant step...',
    rating: 2.5,
    date: '12.07.2018',
    status: 3
  },
  {
    name: 'Apple X2 14',
    author: 'Anshan Handgun',
    review: 'The Series 4 is a significant step...',
    rating: 5.0,
    date: '12.07.2018',
    status: 1
  },
  {
    name: 'Apple Watch Series 15',
    author: 'Larry Doe',
    review: 'The Series 4 is a significant step...',
    rating: 4.0,
    date: '12.07.2018',
    status: 2
  }
];
export default function handler(req, res) {
  return res.status(200).json({ productreviews });
}
