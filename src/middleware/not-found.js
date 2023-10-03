import { StatusCodes } from "http-status-codes";

function notFound(req, res) {
  res.status(StatusCodes.NOT_FOUND).send("Route does not exist.");
}

export { notFound };
