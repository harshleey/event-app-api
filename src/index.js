"use strict";
import express from "express";
import dotenv from "dotenv";
import { logger } from "../src/middleware/logger.js";
import eventRoutes from "../src/routes/events.js";
import session from "express-session";
import mongoStore from "connect-mongo"
import flash from "express-flash";
import passport from "passport";
import authRoute from "./routes/authRoutes.js";
import commentRoute from "./routes/comments.js";
import initializePassport from "./utils/passport.config.js";
initializePassport(passport); // call the function to initialize passport

const app = express();
app.use(express.json());
app.use(flash()); // to return success message and error message on passport-local
dotenv.config();

app.use(logger);

// middlewares
app.use(
  session({
    secret: process.env.MY_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7 * 1000
    },
    store: mongoStore.create({
      mongoUrl: process.env.DATABASE_URL,
      ttl: 7 * 24 * 60 * 60,
      autoRemove: "native"
    })
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Env variables
const PORT = process.env.PORT;

// Display static folder on opening the site
app.use(express.static("public"));

// Route path
app.use("/api/auth", authRoute);
app.use("/api/events", eventRoutes);
app.use("/api/events", commentRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
