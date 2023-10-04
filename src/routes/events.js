import express from "express";
const router = express.Router();
import {
  createEvent,
  deleteEvent,
  getEvent,
  getEvents,
  updateEvent,
} from "../controllers/events.js";
import { ensureAuth } from "../middleware/auth.js";

router
  .post("/", ensureAuth, createEvent)
  .get("/", getEvents)
  .get("/:id", getEvent)
  .put("/:id", ensureAuth, updateEvent)
  .delete("/:id", ensureAuth, deleteEvent);

export default router;
