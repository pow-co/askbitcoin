const delay = (timeout) => new Promise((res) => setTimeout(res, timeout));
let users = [
  {
    id: '5e86809283e28b96d2d38537',
    email: 'info@codedthemes.com',
    password: '123456',
    name: 'JWT User'
  }
];

export default async function handler(req, res) {
  await delay(500);
  const { id, email, password, firstName, lastName } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Enter Your Email & Password' });
  }

  if (!firstName || !lastName) {
    return res.status(400).json({ message: 'Enter Your Name' });
  }
  users = [
    ...users,
    {
      id,
      email,
      password,
      name: `${firstName} ${lastName}`
    }
  ];
  return res.status(200).json(users);
}
