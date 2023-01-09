const customers = [
  { name: 'Joseph William 1', email: 'Joseph@mail.com', location: 'Hong Kong, China', orders: 263, date: '12.07.2018', status: 1 },
  { name: 'Ashy Handgun 2', email: 'Akshay@mail.com', location: 'New York, USA', orders: 750, date: '12.07.2018', status: 2 },
  { name: 'Larry Doe 3', email: 'larry@mail.com', location: 'Hong Kong, China', orders: 1120, date: '12.07.2018', status: 2 },
  { name: 'Sara Soudan 4', email: 'Sara@mail.com', location: 'New York, USA', orders: 975, date: '12.07.2018', status: 3 },
  { name: 'Joseph William 5', email: 'Joseph@mail.com', location: 'Hong Kong, China', orders: 263, date: '12.07.2018', status: 1 },
  { name: 'Aisha Handgun 6', email: 'Akshay@mail.com', location: 'New York, USA', orders: 750, date: '12.07.2018', status: 3 },
  { name: 'Larky Doe 7', email: 'larry@mail.com', location: 'Hong Kong, China', orders: 1120, date: '12.07.2018', status: 2 },
  { name: 'Sara Soupier 8', email: 'Sara@mail.com', location: 'New York, USA', orders: 975, date: '12.07.2018', status: 1 },
  { name: 'Joseph William 9', email: 'Joseph@mail.com', location: 'Hong Kong, China', orders: 263, date: '12.07.2018', status: 3 },
  { name: 'Anshan Handgun 10', email: 'Akshay@mail.com', location: 'New York, USA', orders: 750, date: '12.07.2018', status: 1 },
  { name: 'Lardy Doe 11', email: 'larry@mail.com', location: 'Hong Kong, China', orders: 1120, date: '12.07.2018', status: 1 },
  { name: 'Sara Soudan 12', email: 'Sara@mail.com', location: 'New York, USA', orders: 975, date: '12.07.2018', status: 3 },
  { name: 'Joseph William 13', email: 'Joseph@mail.com', location: 'Hong Kong, China', orders: 263, date: '12.07.2018', status: 2 },
  { name: 'Ashy Handgun 14', email: 'Akshay@mail.com', location: 'New York, USA', orders: 750, date: '12.07.2018', status: 2 },
  { name: 'Lars Doe 15', email: 'larry@mail.com', location: 'Hong Kong, China', orders: 1120, date: '12.07.2018', status: 1 },
  { name: 'Sara Souvenir 16', email: 'Sara@mail.com', location: 'New York, USA', orders: 975, date: '12.07.2018', status: 2 }
];

export default function handler(req, res) {
  return res.status(200).json({ customers });
}
