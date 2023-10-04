import express from 'express';
import { homePage, regNewUser } from '../controllers/authController.js';
import passport from 'passport';
const router = express.Router();

router.post('/api/auth/register', regNewUser);
router.get('/', homePage);
router.post('/api/auth/login', passport.authenticate('local',
  {
    successMessage: 'successfull',
    successRedirect: '/',
    failureRedirect: '',
    successFlash: true,
    failureFlash: true
  }));

export default router;
