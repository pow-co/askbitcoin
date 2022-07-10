// followers list
const followers = [
  {
    id: '#1Followers_Barney',
    avatar: 'user-6.png',
    name: 'Barney',
    location: 'Handburgh',
    follow: 1
  },
  {
    id: '#2Followers_Thea',
    avatar: 'user-3.png',
    name: 'Thea',
    location: 'New jana',
    follow: 2
  },
  {
    id: '#3Followers_Guiseppe',
    avatar: 'user-7.png',
    name: 'Guiseppe',
    location: 'Jenkinsstad',
    follow: 1
  },
  {
    id: '#4Followers_Henderson',
    avatar: 'user-8.png',
    name: 'Henderson',
    location: 'South Antonina',
    follow: 1
  },
  {
    id: '#5Followers_Maddison',
    avatar: 'user-9.png',
    name: 'Maddison',
    location: 'New Dorthy',
    follow: 1
  },
  {
    id: '#6Followers_Wilber',
    avatar: 'user-1.png',
    name: 'Wilber',
    location: 'Twilahsven',
    follow: 1
  },
  {
    id: '#7Followers_Hayden',
    avatar: 'user-4.png',
    name: 'Hayden',
    location: 'Darrelshaire',
    follow: 1
  },
  {
    id: '#8Followers_Lloyd',
    avatar: 'user-10.png',
    name: 'Lloyd',
    location: 'New Credrick',
    follow: 1
  },
  {
    id: '#9Followers_Kris',
    avatar: 'user-8.png',
    name: 'Kris',
    location: 'New Dianna',
    follow: 1
  },
  {
    id: '#10Followers_Kyler',
    avatar: 'user-11.png',
    name: 'Kyler',
    location: 'Murraymouth',
    follow: 1
  },
  {
    id: '#11Followers_Pamela',
    avatar: 'user-3.png',
    name: 'Pamela',
    location: 'Murraymouth',
    follow: 1
  },
  {
    id: '#12Followers_Betty',
    avatar: 'user-6.png',
    name: 'John Doe',
    location: 'North Zole',
    follow: 1
  },
  {
    id: '#13Followers_Anthony',
    avatar: 'user-5.png',
    name: 'Anthony',
    location: 'Lake Judy',
    follow: 1
  },
  {
    id: '#14Followers_Reggie',
    avatar: 'user-12.png',
    name: 'Reggie',
    location: 'Kailynland',
    follow: 1
  },
  {
    id: '#15Followers_Francesca',
    avatar: 'user-1.png',
    name: 'Francesca',
    location: 'Pagacview',
    follow: 2
  },
  {
    id: '#16Followers_Carmel',
    avatar: 'user-9.png',
    name: 'Carmel',
    location: 'Port Lerashire',
    follow: 1
  },
  {
    id: '#17Followers_Darwin',
    avatar: 'user-4.png',
    name: 'Darwin',
    location: 'North Jacquesside',
    follow: 2
  },
  {
    id: '#18Followers_Kaylin',
    avatar: 'user-3.png',
    name: 'Kaylin',
    location: 'Bergstrombury',
    follow: 1
  },
  {
    id: '#19Followers_Kamryn',
    avatar: 'user-7.png',
    name: 'Kamryn',
    location: 'South Norma',
    follow: 1
  },
  {
    id: '#20Followers_Madelyn',
    avatar: 'user-8.png',
    name: 'Madelyn',
    location: 'Port Opheliamouth',
    follow: 1
  }
];

export default function handler(req, res) {
  const { key } = req.body;

  const results = followers.filter((row) => {
    let matches = true;

    const properties = ['name', 'location', 'follow'];
    let containsQuery = false;

    properties.forEach((property) => {
      if (row[property].toString().toLowerCase().includes(key.toString().toLowerCase())) {
        containsQuery = true;
      }
    });

    if (!containsQuery) {
      matches = false;
    }
    return matches;
  });

  return res.status(200).send({ results });
}
