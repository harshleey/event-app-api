"use strict";
import express from "express";
import dotenv from "dotenv";
import { logger } from "../src/middleware/logger.js";

// Routes
import authRoute from "./routes/authRoutes.js";
import eventRoutes from "../src/routes/events.js";
import groupRoutes from "./routes/groups.js";

import session from "express-session";
import flash from "express-flash";
import passport from "passport";
import initializePassport from "./utils/passport.config.js";
// import { notFound } from "./middleware/not-found.js";
initializePassport(passport); // call the function to initialize passport

const app = express();
app.use(express.json());
app.use(flash()); // to return success message and error message on passport-local
dotenv.config();

// middlewares
app.use(logger);
// app.use(notFound);
app.use(
  session({
    secret: process.env.MY_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Env variables
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Welcome to the root route!");
});

// Display static folder on opening the site
app.use(express.static("public"));

// Route path
app.use("/api/auth", authRoute);
app.use("/api/events", eventRoutes);
app.use("/api/groups", groupRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
