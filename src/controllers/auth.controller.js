import { environments } from "../config/environments.js";
import { createJWT } from "../helpers/jsonwebtoken.js";
import { createUser,
         getUserById,
         getUserByEmailAndPassword } from "../models/User.js";
import { UserModel } from "../models/User.js";
import jwt from 'jsonwebtoken';

// Controller for user login
export const ctrlLoginUser = async (req, res) => {
    try {
      const user = await getUserByEmailAndPassword(req.body)
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      };

      const token = await createJWT({ user: user.id })
  
      res.status(200).json(token)
    } catch (error) {
      console.log(error)
      res.sendStatus(500)
    }
};
  

// Controller for user registration
export const ctrlRegisterUser = async (req, res) => {
    try {
      const existingUser = await UserModel.findOne({ where: { email: req.body.email } });

      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      };
      
      const user = await createUser(req.body)
  
      const token = await createJWT({ user: user.id })
  
      res.status(200).json(token)
    } catch (error) {
      res.sendStatus(500)
    }
};
  

// Controller to validate if the token is valid
export const ctrlGetUserByToken = async (req, res) => {
    const token = req.headers.authorization
  
    if (!token) {
      return res.sendStatus(404)
    }
  
    const { user: userId } = jwt.verify(token, environments.SECRET_KEY)
  
    const user = await getUserById(userId)
  
    if (!user) {
      return res.sendStatus(404)
    }
  
    res.status(200).json(user)
};