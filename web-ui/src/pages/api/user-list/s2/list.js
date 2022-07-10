const Avatar1 = '/assets/images/users/avatar-1.png';
const Avatar2 = '/assets/images/users/avatar-2.png';
const Avatar3 = '/assets/images/users/avatar-3.png';

const usersS2 = [
  {
    image: Avatar1,
    name: 'Elnora',
    designation: 'Lead Marketing Facilitator',
    badgeStatus: 'active',
    subContent: 'We need to generate the virtual CSS hard drive!',
    email: 'Reid_OConnell4@yahoo.com',
    phone: '506-654-1653',
    location: 'Saucerize',
    progressValue: '78%'
  },
  {
    image: Avatar2,
    name: 'Hirohito',
    designation: 'Investor Creative Liaison',
    badgeStatus: 'active',
    subContent: 'If we synthesize the protocol, we can get to the RSS circuit through.',
    email: 'Conner22@hotmail.com',
    phone: '673-157-1670',
    location: 'Port Narcos',
    progressValue: '78%'
  },
  {
    image: Avatar3,
    name: 'Kathie',
    designation: 'Human Accountability Strategist',
    badgeStatus: 'inactive',
    subContent: 'We need to generate the virtual CSS hard drive!',
    email: 'Dangelo40@company.com',
    phone: '506-654-1653',
    location: 'Saucerize',
    progressValue: '78%'
  }
];
export default function handler(req, res) {
  return res.status(200).send({ usersS2 });
}
