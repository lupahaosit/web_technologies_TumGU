import express from 'express'
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from 'dotenv'
dotenv.config({path: `.${process.env.NODE_ENV}.env`})

import router from "./router/index";
import errorMiddleware from "./middleware/error.middleware";

const app = express()
const port = process.env.PORT || 8000




app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://127.0.0.1:5500',
  
  credentials: true,

}));


app.use('/api', router);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
app.use(errorMiddleware);

const start = () => {
  try {
    app.listen(port, () => console.log(`Server started on PORT = ${port}`))
  } catch (e) {
    console.log(e);
  }
}

start()
