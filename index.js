// Imports the dependencies
import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
dotenv.config();
import { environments } from "./src/config/environments.js";
import { connectToDatabase } from "./src/config/db.js";
import { userRouter } from "./src/routes/user.routes.js";
import { authRouter } from "./src/routes/auth.routes.js";
import { roleRouter } from "./src/routes/roles.routes.js";
import "./src/models/User.js";

const app = express();

//Middleware necessary
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json())


//Routes are established
app.use('/users', userRouter)

app.use('/auth', authRouter)

app.use('/test', roleRouter)


// Starting the server
app.listen(environments.PORT, async () => {
    console.log(`server on port http://localhost:${environments.PORT}`)
    connectToDatabase()
  })