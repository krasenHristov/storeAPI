import express, { NextFunction, Request, Response } from 'express';
import router from './router';
import morgan from 'morgan';
import cors from 'cors';
import { protect } from './modules/auth';
import { createNewUser, signIn } from './handlers/user';

const app = express();

app.get('/', (_: Request, res: Response) => {
  res.json({ message: 'hello' });
});

// middleware to allow cross-origin requests from the frontend app
app.use(cors());
// middleware to parse json data from the request body into an object
app.use(express.json());
// turns params into an object that can be used in the req
app.use(express.urlencoded({ extended: false }));
// logs requests to the console in dev mode
app.use(morgan('dev'));

// routes for products are protected by the auth middleware (protect)
app.use('/api', protect, router);

// User routes
app.post('/user', createNewUser);
app.post('/signin', signIn);

app.use((err: any, _: Request, res: Response, next: NextFunction) => {
  if (err.type === "auth") {
    return res.status(401).json({ message: "You are not authorized to access this route" });
  }

  else if (err.type === "input") {
    return res.status(400).json({ message: "Invalid input" });
  }

  else {
    return res.status(500).json({ message: "Something went wrong" });
  }
});


export default app;
