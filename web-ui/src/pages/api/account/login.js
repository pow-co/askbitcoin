import jwt from 'jsonwebtoken';
import { JWT_API } from 'config';

// constant
const JWT_SECRET = JWT_API.secret;
const JWT_EXPIRES_TIME = JWT_API.timeout;

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
  const { email, password } = req.body;
  if (window.localStorage.getItem('users') !== undefined && window.localStorage.getItem('users') !== null) {
    const localUsers = window.localStorage.getItem('users');
    users = JSON.parse(localUsers);
  }

  const user = users.find((_user) => _user.email === email);

  if (!user) {
    return res.status(400).json({ message: 'Verify Your Email & Password' });
  }

  if (user.password !== password) {
    return res.status(400).json({ message: 'Invalid Password' });
  }
  const serviceToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_TIME });
  return res.status(200).json({
    serviceToken,
    user: {
      id: user.id,
      email: user.email,
      name: user.name
    }
  });
}
