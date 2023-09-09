import { Router } from 'express';
import { getUser } from '../middlewares/get.user.js';
import { isAdmin } from '../middlewares/roles.js';

const roleRouter = Router();

roleRouter.get('/', getUser, isAdmin, (req, res) => {
  res.json(req.user)
});

export { roleRouter };