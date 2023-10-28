import express from "express";
import {
  deleteComment,
  getComments,
  likeAndUnlike,
  writeComment,
} from "../controllers/comments.js";
import { ensureAuth } from "../middleware/auth.js";
const router = express.Router();

router.post("/:eventId/comment", ensureAuth, writeComment);
router.delete("/:eventId/:commentId", ensureAuth, deleteComment);
router.get("/:eventId/comments", getComments);
router.put("/comment/:commentId", ensureAuth, likeAndUnlike);

export default router;