import jwt from 'jsonwebtoken';
import { environments } from '../config/environments.js';

export const createJWT = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, environments.SECRET_KEY, (err, token) => {
      if (err) {
        reject('Error while creating the token')
      }

      resolve({ token })
    })
  })
};