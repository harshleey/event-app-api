'use strict';
import express from 'express';
import dotenv from 'dotenv';
import { logger } from "../src/middleware/logger.js";
import eventRoutes from "../src/routes/events.js";
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

app.use(logger)

// middlewares
app.use(session({
  secret: process.env.MY_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Env variables
const PORT = process.env.PORT;

// Display static folder on opening the site
app.use(express.static('public'));

// Route path
app.use('/', authRoute);
app.use("/api/events", eventRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
