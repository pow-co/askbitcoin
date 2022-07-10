const profileIdsData = {
  profile1: 'profile-1',
  profile2: 'profile-2',
  profile3: 'profile-3'
};

const profilesData = [
  {
    id: profileIdsData.profile1,
    avatar: 'avatar-3.png',
    name: 'Barney Thea',
    time: '2 min ago'
  },
  {
    id: profileIdsData.profile2,
    avatar: 'avatar-1.png',
    name: 'Maddison Wilber',
    time: '1 day ago'
  },
  {
    id: profileIdsData.profile3,
    avatar: 'avatar-2.png',
    name: 'John Doe',
    time: 'now'
  }
];

export default function handler(req, res) {
  return res.status(200).json({ profiles: profilesData });
}
