import express from "express";
const router = express.Router();
import {
  createEvent,
  deleteEvent,
  getEvent,
  getEvents,
  updateEvent,
} from "../controllers/events.js";

router
  .post("/", createEvent)
  .get("/", getEvents)
  .get("/:id", getEvent)
  .put("/:id", updateEvent)
  .delete("/:id", deleteEvent);

export default router;
