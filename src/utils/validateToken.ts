import jwt from 'jsonwebtoken';

const validateToken = (token:string) => {
  try {
    return jwt.verify(token, String(process.env.SECRET));
  } catch (error) {
    return null;
  }
};

export default validateToken;
