// friends list
const friends = [
  {
    id: '#1Friends_Barney',
    avatar: 'user-1.png',
    name: 'Barney',
    location: 'Handburgh'
  },
  {
    id: '#2Friends_Thea',
    avatar: 'user-2.png',
    name: 'Thea',
    location: 'New jana'
  },
  {
    id: '#3Friends_Guiseppe',
    avatar: 'user-3.png',
    name: 'Guiseppe',
    location: 'Jenkinsstad'
  },
  {
    id: '#4Friends_Henderson',
    avatar: 'user-4.png',
    name: 'Henderson',
    location: 'South Antonina'
  },
  {
    id: '#5Friends_Maddison',
    avatar: 'user-5.png',
    name: 'Maddison',
    location: 'New Dorthy'
  },
  {
    id: '#6Friends_Wilber',
    avatar: 'user-6.png',
    name: 'Wilber',
    location: 'Twilahsven'
  },
  {
    id: '#7Friends_Hayden',
    avatar: 'user-7.png',
    name: 'Hayden',
    location: 'Darrelshaire'
  },
  {
    id: '#8Friends_Lloyd',
    avatar: 'user-8.png',
    name: 'Lloyd',
    location: 'New Credrick'
  },
  {
    id: '#9Friends_Kris',
    avatar: 'user-9.png',
    name: 'Kris',
    location: 'New Dianna'
  },
  {
    id: '#10Friends_Kyler',
    avatar: 'user-10.png',
    name: 'Kyler',
    location: 'Murraymouth'
  },
  {
    id: '#11Friends_Pamela',
    avatar: 'user-11.png',
    name: 'Pamela',
    location: 'Murraymouth'
  },
  {
    id: '#12Friends_Betty',
    avatar: 'user-12.png',
    name: 'John Doe',
    location: 'North Zole'
  },
  {
    id: '#13Friends_Anthony',
    avatar: 'user-1.png',
    name: 'Anthony',
    location: 'Lake Judy'
  },
  {
    id: '#14Friends_Reggie',
    avatar: 'user-3.png',
    name: 'Reggie',
    location: 'Kailynland'
  },
  {
    id: '#15Friends_Francesca',
    avatar: 'user-4.png',
    name: 'Francesca',
    location: 'Pagacview'
  },
  {
    id: '#16Friends_Carmel',
    avatar: 'user-5.png',
    name: 'Carmel',
    location: 'Port Lerashire'
  },
  {
    id: '#17Friends_Darwin',
    avatar: 'user-6.png',
    name: 'Darwin',
    location: 'North Jacquesside'
  },
  {
    id: '#18Friends_Kaylin',
    avatar: 'user-7.png',
    name: 'Kaylin',
    location: 'Bergstrombury'
  },
  {
    id: '#19Friends_Kamryn',
    avatar: 'user-8.png',
    name: 'Kamryn',
    location: 'South Norma'
  },
  {
    id: '#20Friends_Madelyn',
    avatar: 'user-9.png',
    name: 'Madelyn',
    location: 'Port Opheliamouth'
  }
];
export default function handler(req, res) {
  return res.status(200).send({ friends });
}
