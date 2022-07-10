// user profile card
const users = [
  {
    id: '#1Card_Perry',
    avatar: 'user-7.png',
    profile: 'profile-back-1.png',
    name: 'Perry',
    role: 'Internal Assurance Architect',
    status: 'Active'
  },
  {
    id: '#2Card_Jennyfer',
    avatar: 'user-6.png',
    profile: 'profile-back-2.png',
    name: 'Jennyfer',
    role: 'Internal Data Facilitator',
    status: 'Active'
  },
  {
    id: '#3Card_Antonette',
    avatar: 'user-5.png',
    profile: 'profile-back-3.png',
    name: 'Antonette',
    role: 'National Applications Officer',
    status: 'Rejected'
  },
  {
    id: '#4Card_Mekhi',
    avatar: 'user-4.png',
    profile: 'profile-back-4.png',
    name: 'Mekhi',
    role: 'Central Quality Liaison',
    status: 'Active'
  },
  {
    id: '#5Card_Margie',
    avatar: 'user-3.png',
    profile: 'profile-back-5.png',
    name: 'Margie',
    role: 'Direct Implementation Developer',
    status: 'Active'
  },
  {
    id: '#6Card_Wilfrid',
    avatar: 'user-2.png',
    profile: 'profile-back-6.png',
    name: 'Wilfrid',
    role: 'Lead Intranet Planner',
    status: 'Active'
  },
  {
    id: '#7Card_Kennedy',
    avatar: 'user-1.png',
    profile: 'profile-back-7.png',
    name: 'Kennedy',
    role: 'Regional Division Administrator',
    status: 'Active'
  },
  {
    id: '#8Card_Ida',
    avatar: 'user-4.png',
    profile: 'profile-back-8.png',
    name: 'Ida',
    role: 'Central Brand Coordinator',
    status: 'Active'
  },
  {
    id: '#9Card_Madyson',
    avatar: 'user-5.png',
    profile: 'profile-back-9.png',
    name: 'Madyson',
    role: 'Product Tactics Facilitator',
    status: 'Active'
  },
  {
    id: '#10Card_Murphy',
    avatar: 'user-6.png',
    profile: 'profile-back-10.png',
    name: 'Murphy',
    role: 'Lead Directives Analyst',
    status: 'Rejected'
  },
  {
    id: '#11Card_Lucie',
    avatar: 'user-7.png',
    profile: 'profile-back-11.png',
    name: 'Lucie',
    role: 'Principal Marketing Administrator',
    status: 'Active'
  },
  {
    id: '#12Card_Sonny',
    avatar: 'user-1.png',
    profile: 'profile-back-12.png',
    name: 'Sonny',
    role: 'Direct Assurance Administrator',
    status: 'Active'
  }
];

export default function handler(req, res) {
  const { key } = req.body;

  const results = users.filter((row) => {
    let matches = true;

    const properties = ['name', 'role', 'status'];
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
