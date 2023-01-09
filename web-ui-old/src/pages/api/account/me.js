import jwt from 'jsonwebtoken';

// project imports
import { JWT_API } from 'config';

// constant
const JWT_SECRET = JWT_API.secret;
let users = [
  {
    id: '5e86809283e28b96d2d38537',
    email: 'info@codedthemes.com',
    password: '123456',
    name: 'JWT User'
  }
];
export default async function handler(req, res) {
  const { Authorization } = req.headers;
  if (!Authorization) {
    res.status(401).json({ message: 'Token Missing' });
  }
  if (window.localStorage.getItem('users') !== undefined && window.localStorage.getItem('users') !== null) {
    const localUsers = window.localStorage.getItem('users');
    users = JSON.parse(localUsers);
  }
  const serviceToken = Authorization.toString();
  const jwData = jwt.verify(serviceToken, JWT_SECRET);
  const { userId } = jwData;
  const user = users.find((_user) => _user.id === userId);

  if (!user) {
    return res.status(401).json({ message: 'Invalid Token' });
  }
  return res.status(200).json({
    user: {
      id: user.id,
      email: user.email
    }
  });
}
