// import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import path from 'path';
import { database } from '../libs/prisma.js';
// const prisma = new PrismaClient();

// register new user
export const regNewUser = async (req, res) => {
  try {
    const { username, email, password, avatar } = req.body;
    // search for existing user credential
    const existUser = await database.user.findUnique({ where: { email: email } });
    if (!existUser) {
      // hash user password
      const saltRound = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, saltRound);
      const newUser = await database.user.create({
        data: {
          username,
          email,
          password: hash,
          avatar
        }
      });
      res.status(201).json({
        success: true,
        message: 'user created successfully',
        data: newUser
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'user already exzit with the credential'
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

// sample plage to test login success
export const homePage = async (req, res) => {
  return res.sendFile(path.resolve('public/index.html'));
};
