// friends list
const friends = [
  {
    id: '#1Friends_Barney',
    avatar: 'user-1.png',
    name: 'Barney',
    mutual: 10
  },
  {
    id: '#2Friends_Thea',
    avatar: 'user-2.png',
    name: 'Thea',
    mutual: 89
  },
  {
    id: '#3Friends_Guiseppe',
    avatar: 'user-3.png',
    name: 'Guiseppe',
    mutual: 65
  },
  {
    id: '#4Friends_Henderson',
    avatar: 'user-4.png',
    name: 'Henderson',
    mutual: 1
  },
  {
    id: '#5Friends_Maddison',
    avatar: 'user-5.png',
    name: 'Maddison',
    mutual: 14
  },
  {
    id: '#6Friends_Wilber',
    avatar: 'user-6.png',
    name: 'Wilber',
    mutual: 36
  },
  {
    id: '#7Friends_Hayden',
    avatar: 'user-7.png',
    name: 'Hayden',
    mutual: 106
  },
  {
    id: '#8Friends_Lloyd',
    avatar: 'user-8.png',
    name: 'Lloyd',
    mutual: 10
  },
  {
    id: '#9Friends_Kris',
    avatar: 'user-9.png',
    name: 'Kris',
    mutual: 0
  },
  {
    id: '#10Friends_Kyler',
    avatar: 'user-10.png',
    name: 'Kyler',
    mutual: 48
  },
  {
    id: '#11Friends_Pamela',
    avatar: 'user-11.png',
    name: 'Pamela',
    mutual: 72
  },
  {
    id: '#12Friends_Betty',
    avatar: 'user-12.png',
    name: 'John Doe',
    mutual: 99
  },
  {
    id: '#13Friends_Anthony',
    avatar: 'user-1.png',
    name: 'Anthony',
    mutual: 78
  },
  {
    id: '#14Friends_Reggie',
    avatar: 'user-3.png',
    name: 'Reggie',
    mutual: 1
  },
  {
    id: '#15Friends_Francesca',
    avatar: 'user-4.png',
    name: 'Francesca',
    mutual: 68
  },
  {
    id: '#16Friends_Carmel',
    avatar: 'user-5.png',
    name: 'Carmel',
    mutual: 15
  },
  {
    id: '#17Friends_Darwin',
    avatar: 'user-6.png',
    name: 'Darwin',
    mutual: 10
  },
  {
    id: '#18Friends_Kaylin',
    avatar: 'user-7.png',
    name: 'Kaylin',
    mutual: 36
  },
  {
    id: '#19Friends_Kamryn',
    avatar: 'user-8.png',
    name: 'Kamryn',
    mutual: 55
  },
  {
    id: '#20Friends_Madelyn',
    avatar: 'user-9.png',
    name: 'Madelyn',
    mutual: 78
  }
];

export default function handler(req, res) {
  return res.status(200).send({ friends });
}
