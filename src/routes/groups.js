import express from "express";
const router = express.Router();
import { ensureAuth } from "../middleware/auth.js";
import {
  addEventToGroup,
  addUserGroup,
  createGroup,
  delEventFromGroup,
  deleteGroup,
  getGroupById,
  getGroupByUserId,
  getGroups,
  removeUserGroup,
  updateGroup,
} from "../controllers/group.js";

router
  .post("/", ensureAuth, createGroup)
  .post("/:groupId/members/:userId", ensureAuth, addUserGroup)
  .post("/:groupId/events/:eventId", ensureAuth, addEventToGroup)
  .get("/", getGroups)
  .get("/:groupId", getGroupById)
  .get("/filterByUserId", getGroupByUserId)
  .put("/:groupId", ensureAuth, updateGroup)
  .delete("/:groupId", ensureAuth, deleteGroup)
  .delete("/:groupId/members/:userId", ensureAuth, removeUserGroup)
  .delete("/:groupId/events/:eventId", ensureAuth, delEventFromGroup);

export default router;
