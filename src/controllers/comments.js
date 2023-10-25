import { database } from "../libs/prisma.js";
import statusCode from "http-status-codes";

// create comment on event
export const writeComment = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { id: userId } = req.user;

    // find event
    const isEvent = await database.events.findUnique({
      where: {
        id: eventId,
      },
    });
    if (isEvent) {
      await database.comments
        .create({
          data: {
            comment: req.body.comment,
            eventId,
            userId,
          },
        })
        .then((comment) => {
          return res.status(statusCode.CREATED).json({
            message: "you comment on " + isEvent.tittle,
            comment,
          });
        }).catch((err) => {
          res.status(statusCode.BAD_REQUEST).json({
            message: "you cn not delete comment " + err.message,
          });
        });
    } else {
      return res.status(statusCode.NOT_FOUND).json({
      message: "not event found" + err.message,
    });
    }
  } catch (err) {
    return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    });
  }
};
// delete comment on event
export const deleteComment = async (req, res) => {
  try {
    const { eventId, commentId } = req.params;

    // find comment from event before deletion
    const isEvent = await database.events.findUnique({
      where: { id: eventId },
    });
    if (!isEvent) {
      res.status(statusCode.NOT_FOUND).json({
        messgae: err.message,
      });
    }
    await database.comments
      .delete({
        where: {
          eventId,
          id: commentId
        },
      })
      .then(() => {
        res.status(statusCode.OK).json({
          message: "your comment is deleted",
        });
      })
      .catch((err) => {
        res.status(statusCode.BAD_REQUEST).json({
          message: "you can not delete comment " + err.message,
        });
      });
  } catch (err) {
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    });
  }
};
// find all comment of event
export const getComments = async (req, res) => {
  try {
    const { eventId } = req.params;
    const page = req.query.page || 1;
    // find event
    const isEvent = await database.events.findUnique({
      where: {
        id: eventId,
      },
    });
    if (!isEvent) {
      res.status(statusCode.NOT_FOUND).json({
        messahe: "not a valid event " + err.message,
      });
    }
    //pagination
    const commentPerPage = 10;
    const pageSkip = (page - 1) * commentPerPage;

    // get comments of event
    await database.comments
      .findMany({
        where: {
          eventId: eventId,
        },
        skip: pageSkip,
      })
      .then((comments) => {
        res.status(statusCode.OK).json({
          comments,
        });
      })
      .catch((err) => {
        res.status(statusCode.BAD_REQUEST).json({
          message: "something went wrong " + err.message,
        });
      });
  } catch (err) {
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    });
  }
};
// like and unlike comment of event
export const likeAndUnlike = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { id: userId } = req.user;

    const isComment = await database.comments.findUnique({
      where: {
        id: commentId,
      },
    });
    if (!isComment) {
      return res.status(statusCode.NOT_FOUND).json({
        message: "this comment does not exist",
      });
    }
    // check if comment is liked or not
    const isLiked = await database.likes.findFirst({
      where: {
        userId,
        commentId,
      },
    });
    if (isLiked) {
      await database.likes
        .delete({
          where: {
            commentId: commentId,
            userId
          }
        })
        .then(() => {
          return res.status(statusCode.OK).json({
            message: "you unlike this comment",
          });
        })
        .catch((err) => {
          return res.status(statusCode.BAD_REQUEST).json({
            message: "something went wrong!, try again " + err.message,
          });
        });
    } else {
      // create a like for comment
    await database.likes
      .create({
        data: {
          userId,
          commentId,
        },
      })
      .then(() => {
        return res.status(statusCode.CREATED).json({
          message: "you like this comment",
        });
      })
      .catch((err) => {
        return res.status(statusCode.BAD_REQUEST).json({
          message: "something went wrong! " + err.message
        })
      });
    }
    
  } catch (err) {
    return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    });
  }
};
