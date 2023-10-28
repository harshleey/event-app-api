import express from "express";
const router = express.Router();
import {
  addUserIntInEvent,
  createEvent,
  deleteEvent,
  getEvent,
  getEvents,
  removeUserUnIntInEvent,
  updateEvent,
} from "../controllers/events.js";
import { ensureAuth } from "../middleware/auth.js";

router
  .post("/", ensureAuth, createEvent)
  .post("/:eventId/InterestedMembers/:userId", ensureAuth, addUserIntInEvent)
  .get("/", getEvents)
  .get("/:eventId", getEvent)
  .put("/:eventId", ensureAuth, updateEvent)
  .delete("/:eventId", ensureAuth, deleteEvent)
  .delete(
    "/:eventId/InterestedMembers/:userId",
    ensureAuth,
    removeUserUnIntInEvent
  );

export default router;
