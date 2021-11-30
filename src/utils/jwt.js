import jwt from 'jsonwebtoken';

export const generateLoginToken = (payload) => (
  jwt.sign(
    payload,
    process.env.TOKEN_LOGIN_SK,
    { expiresIn: process.env.LOGIN_TOKEN_EXPIRATION },
  )
);

export const verifyLoginToken = (token) => (
  jwt.verify(
    token,
    process.env.TOKEN_LOGIN_SK,
  )
);
