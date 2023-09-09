import { ROLES } from "../models/User.js";

//Restricting access to protected resources
export const isAdmin = (req, res, next) => {
  if (req.user.role !== ROLES.ADMIN) {
    return res.sendStatus(403)
  }

  next()
};