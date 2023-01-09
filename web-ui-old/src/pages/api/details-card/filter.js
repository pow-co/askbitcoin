const users = [
  {
    id: '#1Card_Phoebe',
    avatar: 'user-1.png',
    name: 'Phoebe',
    role: 'Dynamic Operations Officer',
    about: 'Use the neural RSS application, then you can program the bluetooth firewall! #DOO',
    email: 'claudia_kuhn@yahoo.com',
    contact: '380-293-0177',
    location: 'Port Narcos'
  },
  {
    id: '#2Card_Gaetano',
    avatar: 'user-2.png',
    name: 'Gaetano',
    role: 'Investor Division Strategist',
    about: 'Try to connect the SAS transmitter, maybe it will index the optical hard drive!',
    email: 'alia_shields25@yahoo.com',
    contact: '253-418-5940',
    location: 'Herminahaven'
  },
  {
    id: '#3Card_Elisabeth',
    avatar: 'user-3.png',
    name: 'Elisabeth',
    role: 'Future Markets Associate',
    about: 'If we calculate the monitor, we can get to the CSS sensor through the open-source AGP application!',
    email: 'kieran.mertz87@hotmail.com',
    contact: '283-029-1364',
    location: 'Kihnland'
  },
  {
    id: '#4Card_Rosalia',
    avatar: 'user-4.png',
    name: 'Rosalia',
    role: 'Global Brand Planner',
    about: 'The SCSI program is down, override the cross-platform sensor so we can quantify the SAS firewall!',
    email: 'luis.nader30@hotmail.com',
    contact: '972-477-5225',
    location: 'Collinsborough'
  },
  {
    id: '#5Card_Lizeth',
    avatar: 'user-5.png',
    name: 'Lizeth',
    role: 'District Intranet Executive',
    about: 'The TCP hard drive is down, navigate the redundant driver so we can connect the SMS sensor!',
    email: 'alicia.ohara@company.com',
    contact: '474-215-1871',
    location: 'Alizaville'
  },
  {
    id: '#6Card_Jessyca',
    avatar: 'user-6.png',
    name: 'Jessyca',
    role: 'Future Accountability Liaison',
    about: "You can't program the protocol without parsing the 1080p PNG bandwidth!",
    email: 'titus.kunde76@hotmail.com',
    contact: '235-802-6863',
    location: 'Brandonville'
  },
  {
    id: '#7Card_Roberto',
    avatar: 'user-7.png',
    name: 'Roberto',
    role: 'Product Communications Analyst',
    about: 'Use the solid state JBOD application, then you can generate the multi-byte pixel!',
    email: 'keira61@hotmail.com',
    contact: '712-162-3638',
    location: 'Manuelastad'
  },
  {
    id: '#8Card_Ava',
    avatar: 'user-2.png',
    name: 'Ava',
    role: 'Forward Accounts Assistant',
    about: 'Use the 1080p HDD circuit, then you can calculate the open-source interface!',
    email: 'jailyn_wilderman@company.com',
    contact: '192-612-2096',
    location: 'Lake Keenan'
  },
  {
    id: '#9Card_Dillon',
    avatar: 'user-4.png',
    name: 'Dillon',
    role: 'Future Factors Strategist',
    about: 'The PNG alarm is down, navigate the back-end application so we can generate the FTP driver!',
    email: 'caesar80@yahoo.com',
    contact: '798-877-8614',
    location: 'Russelfurt'
  },
  {
    id: '#10Card_Domingo',
    avatar: 'user-7.png',
    name: 'Domingo',
    role: 'Investor Identity Facilitator',
    about: 'Use the neural XSS firewall, then you can generate the cross-platform capacitor!',
    email: 'hudson.welch54@company.com',
    contact: '642-979-7584',
    location: 'Itzelview'
  },
  {
    id: '#11Card_Connor',
    avatar: 'user-1.png',
    name: 'Connor',
    role: 'Dynamic Intranet Strategist',
    about: 'The CSS program is down, copy the mobile capacitor so we can override the AI alarm!',
    email: 'reese_daniel54@yahoo.com',
    contact: '838-147-6612',
    location: 'Margarettstad'
  },
  {
    id: '#12Card_Delfina',
    avatar: 'user-5.png',
    name: 'Delfina',
    role: 'Chief Response Orchestrator',
    about: "Parsing the monitor won't do anything, we need to navigate the back-end JBOD bus!",
    email: 'stevie.corwin25@company.com',
    contact: '777-709-1293',
    location: 'North Monty'
  }
];

export default function handler(req, res) {
  const { key } = req.body;

  const results = users.filter((row) => {
    let matches = true;

    const properties = ['name', 'role', 'about', 'email', 'contact', 'location'];
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
  return res.status(200).json({ results });
}
