// import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { database } from '../libs/prisma.js';
import { Strategy as LocalStrategy } from 'passport-local';
// const Prisma = new PrismaClient();

async function initialize (passport) {
  passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    const user = await database.user.findUnique({ where: { email: email } });
    if (!user) {
      return done(null, false, { message: 'no user is found' });
    }
    try {
      // compare user password to hash password
      const pwdMatch = bcrypt.compareSync(password, user.password);
      if (!pwdMatch) {
        return done(null, false, { message: 'email or password incorrect' });
      } else {
        return done(null, user, { message: 'user logged in as ' + user.username });
      }
    } catch (err) {
      console.log(err);
      return done(err);
    }
  }));
  // serielize user
  passport.serializeUser((user, done) => {
    return done(null, user.id);
  });
  // deserialize user
  passport.deserializeUser((id, done) => {
    return done(null, id);
  });
}

export default initialize;
