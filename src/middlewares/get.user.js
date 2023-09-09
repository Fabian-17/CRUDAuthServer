import { environments } from "../config/environments.js";
import { getUserById } from "../models/User.js";
import jwt from "jsonwebtoken";


//Verify user authentication
export const getUser = async (req, res, next) => {
    const token = req.headers.authorization
  
    if (!token) {
      return res.sendStatus(404)
    }
  
    const { user: userId } = jwt.verify(token, environments.SECRET_KEY)
  
    const user = await getUserById(userId)
  
    if (!user) {
      return res.sendStatus(403)
    }
  
    req.user = user
    next()
  };