"use strict";
import express from "express";
import dotenv from "dotenv";
import { logger } from "../src/middleware/logger.js";
import eventRoutes from "../src/routes/events.js";

const app = express();
app.use(express.json());
dotenv.config();

// Env variables
const PORT = process.env.PORT;

// Display static folder on opening the site
app.use(express.static("public"));

// Route path
app.use("/api/events", logger, eventRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
