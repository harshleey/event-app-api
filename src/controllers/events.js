import { StatusCodes } from "http-status-codes";
import { database } from "../libs/prisma.js";
import { asyncWrapper } from "../middleware/asyncWrapper.js";

// Create an event
const createEvent = asyncWrapper(async (req, res) => {
  const {
    title,
    description,
    location,
    start_date,
    start_time,
    end_date,
    end_time,
  } = req.body;
  const { id: userId } = req.user;
  console.log(userId);

  const event = await database.events.create({
    data: {
      title,
      description,
      location,
      start_date,
      start_time,
      end_date,
      end_time,
      userId,
    },
  });
  console.log(event);
  res.status(StatusCodes.CREATED).json({ event, errors: null });
});

const getEvents = asyncWrapper(async (req, res) => {
  const events = await database.events.findMany();
  res.status(StatusCodes.OK).json({ events, errors: null });
});

const getEvent = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const event = await database.events.findUnique({
    where: { id },
  });
  res.status(StatusCodes.OK).json({ event, errors: null });
});

const updateEvent = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    location,
    start_date,
    start_time,
    end_date,
    end_time,
  } = req.body;
  const { id: userId } = req.user;

  const event = await database.events.update({
    data: {
      title,
      description,
      location,
      start_date,
      start_time,
      end_date,
      end_time,
    },
    where: { id, userId },
  });
  res.status(StatusCodes.OK).json({ event, errors: null });
});

const deleteEvent = asyncWrapper(async (req, res) => {
  const { id: userId } = req.user;
  const { id } = req.params;

  // const event = await database.events.findUnique({
  //   where: { id },
  // });

  // Delete from database
  const delEvent = await database.events
    .delete({ where: { id, userId } })
    .catch((error) => error.meta);
  res.status(StatusCodes.OK).json({
    event: delEvent ? delEvent : null,
    errors: delEvent?.cause ? delEvent.cause : null,
  });
});

export { createEvent, getEvents, getEvent, updateEvent, deleteEvent };
