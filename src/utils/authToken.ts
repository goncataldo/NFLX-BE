import jwt from 'jsonwebtoken';
const secret = process.env.JWT_TOKEN_SECRET

interface JwtPayload {
    id: string
  }

export const authToken = (token: string) => {
    const { id } = jwt.verify(token, secret as string) as JwtPayload
    return id;
};