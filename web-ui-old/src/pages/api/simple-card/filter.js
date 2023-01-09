// user simple cards
const users = [
  {
    id: '#1Card_Kelli',
    avatar: 'user-1.png',
    name: 'Kelli',
    status: 'Active'
  },
  {
    id: '#2Card_Laurence',
    avatar: 'user-2.png',
    name: 'Laurence',
    status: 'Rejected'
  },
  {
    id: '#3Card_Melyssa',
    avatar: 'user-3.png',
    name: 'Melyssa',
    status: 'Active'
  },
  {
    id: '#4Card_Montana',
    avatar: 'user-4.png',
    name: 'Montana',
    status: 'Active'
  },
  {
    id: '#5Card_Johnathan',
    avatar: 'user-5.png',
    name: 'Johnathan',
    status: 'Active'
  },
  {
    id: '#6Card_Joanne',
    avatar: 'user-6.png',
    name: 'Joanne',
    status: 'Active'
  },
  {
    id: '#7Card_Lisandro',
    avatar: 'user-7.png',
    name: 'Lisandro',
    status: 'Rejected'
  },
  {
    id: '#8Card_Geovany',
    avatar: 'user-1.png',
    name: 'Geovany',
    status: 'Active'
  },
  {
    id: '#9Card_Lucius',
    avatar: 'user-2.png',
    name: 'Lucius',
    status: 'Active'
  },
  {
    id: '#10Card_River',
    avatar: 'user-3.png',
    name: 'River',
    status: 'Active'
  },
  {
    id: '#11Card_Haylee',
    avatar: 'user-4.png',
    name: 'Haylee',
    status: 'Active'
  },
  {
    id: '#12Card_John',
    avatar: 'user-5.png',
    name: 'John',
    status: 'Active'
  },
  {
    id: '#13Card_Jeanne',
    avatar: 'user-6.png',
    name: 'Jeanne',
    status: 'Active'
  },
  {
    id: '#14Card_Maryam',
    avatar: 'user-7.png',
    name: 'Maryam',
    status: 'Rejected'
  },
  {
    id: '#15Card_Alexandre',
    avatar: 'user-1.png',
    name: 'Alexandre',
    status: 'Active'
  },
  {
    id: '#16Card_Jordi',
    avatar: 'user-2.png',
    name: 'Jordi',
    status: 'Active'
  },
  {
    id: '#17Card_Sharon',
    avatar: 'user-3.png',
    name: 'Sharon',
    status: 'Active'
  },
  {
    id: '#18Card_Trycia',
    avatar: 'user-4.png',
    name: 'Trycia',
    status: 'Active'
  },
  {
    id: '#19Card_Mazie',
    avatar: 'user-5.png',
    name: 'Mazie',
    status: 'Active'
  },
  {
    id: '#20Card_Virgie',
    avatar: 'user-6.png',
    name: 'Virgie',
    status: 'Active'
  }
];

export default function handler(req, res) {
  const { key } = req.body;

  const results = users.filter((row) => {
    let matches = true;

    const properties = ['name', 'status'];
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
