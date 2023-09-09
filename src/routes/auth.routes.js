import { Router } from "express";
import { ctrlGetUserByToken,
        ctrlLoginUser,
        ctrlRegisterUser } from "../controllers/auth.controller.js";
import { createUserSchema, loginUserSchema } from "../models/Schema/User.Schema.js";
import { validator } from "../middlewares/validator.js";


const authRouter = Router();

// Route to get user information by token
authRouter.get('/user', ctrlGetUserByToken);

// Route to login a user, with validation middleware
authRouter.post('/login', loginUserSchema, validator, ctrlLoginUser);

// Route to register a new user, with validation middleware
authRouter.post('/register', createUserSchema, validator, ctrlRegisterUser);


export { authRouter };