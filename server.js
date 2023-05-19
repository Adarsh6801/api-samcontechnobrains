import express from 'express'
import dotenv from "dotenv"
import bodyParser from "body-parser";
import cookieParser from "cookie-parser"

import { dbConnect } from './config/database.config.js';

dotenv.config()

const app=express();

// import routes
import userRouter from "../api/routes/userRouter/user.router.js"

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// Set up body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


// setup routes
app.use('/user', userRouter);

//connecting the mongodb
dbConnect()

//server connection setup
app.listen(process.env.PORT, () => {
  console.log(`Server is connected to the PORT: ${process.env.PORT}`);
})
