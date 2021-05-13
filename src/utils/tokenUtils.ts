import jwt from 'jsonwebtoken';
import { Iuser } from '../Interfaces/Iusers';

// eslint-disable-next-line arrow-body-style
const generateToken = (payload:Iuser, secret:string, expiresIn:string) => {
  const {
    _id, name, lastname, email,
  } = payload;
  return jwt.sign({
    _id, name, lastname, email,
  }, secret, { expiresIn });
};

const validateToken = (token:string) => {
  try {
    return jwt.verify(token, String(process.env.SECRET));
  } catch (error) {
    return null;
  }
};

export { generateToken, validateToken };
