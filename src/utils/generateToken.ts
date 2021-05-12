import jwt from 'jsonwebtoken';
import { Iuser } from '../Interfaces/Iusers';

// eslint-disable-next-line arrow-body-style
const generateToken = (payload:Iuser, secret:string, expiresIn:string) => {
  return jwt.sign(payload, secret, { expiresIn });
};

export default generateToken;
