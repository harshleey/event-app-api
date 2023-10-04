'use strict';
import express from 'express';
import dotenv from 'dotenv';
// import { logger } from './middleware/logger';
import session from 'express-session';
import flash from 'express-flash';
import passport from 'passport';
import authRoute from './routes/authRoutes.js';
import initializePassport from './utils/passport.config.js';
initializePassport(passport); // call the function to initialize passport

const app = express();
app.use(express.json());
app.use(flash()); // to return success message and error message on passport-local
dotenv.config();

// middlewares
app.use(session({
  secret: process.env.MY_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// custom middlewares
app.use('/', authRoute);

// Env variables
const PORT = process.env.PORT;

// Display static folder on opening the site
app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
