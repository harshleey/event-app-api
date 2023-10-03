import { StatusCodes } from "http-status-codes";
import { CustomErrorApi } from "../errors/custom-error-api.js";

function errorHandler(err, req, res, next) {
  if (err instanceof CustomErrorApi) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: "Internal server error" });
}

export { errorHandler };
