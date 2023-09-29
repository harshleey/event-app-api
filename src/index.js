"use strict";
import express from "express";
import dotenv from "dotenv";
import { logger } from "./middleware/logger";

const app = express();
app.use(express.json());
dotenv.config();

// Env variables
const PORT = process.env.PORT;

// Display static folder on opening the site
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
