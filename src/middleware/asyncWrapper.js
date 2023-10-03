import { database } from "../libs/prisma.js";

function asyncWrapper(func) {
  return async function (req, res, next) {
    try {
      await func(req, res, next);
    } catch (error) {
      next(error);
    } finally {
      await database.$disconnect();
    }
  };
}

export { asyncWrapper };
