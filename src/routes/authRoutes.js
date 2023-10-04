import express from "express";
import {
  // homePage,
  postLogin,
  regNewUser,
} from "../controllers/authController.js";
const router = express.Router();

router.post("/register", regNewUser);
// router.get("/", homePage);
router.post("/login", postLogin);

export default router;
