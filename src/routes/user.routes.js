import { Router } from 'express';
import { ctrlCreateUser,
    ctrlDeleteUser,
    ctrlGetAllUsers,
    ctrlGetUser,
    ctrlUpdateUser } from '../controllers/user.controller.js';
import { createUserSchema } from '../models/Schema/User.Schema.js';
import {validator} from '../middlewares/validator.js'
const userRouter = Router();

// Route to get all users
userRouter.get('/', ctrlGetAllUsers);

// Route to get a user by ID
userRouter.get('/:id', ctrlGetUser);

// Route to create a new user
userRouter.post('/', createUserSchema, validator, ctrlCreateUser);

// Route to update an existing user by ID
userRouter.put('/:id', ctrlUpdateUser);

// Route to delete a user by ID
userRouter.delete('/:id', ctrlDeleteUser);

export { userRouter };