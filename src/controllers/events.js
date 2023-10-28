import { StatusCodes } from "http-status-codes";
import { database } from "../libs/prisma.js";
import { asyncWrapper } from "../middleware/asyncWrapper.js";
import {
  addUserToEvent,
  findUser,
  removeUserFromEvent,
} from "../repository/events.js";

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
  const { eventId } = req.params;
  const event = await database.events.findUnique({
    where: { id: eventId },
  });
  res.status(StatusCodes.OK).json({ event, errors: null });
});

const updateEvent = asyncWrapper(async (req, res) => {
  const { eventId } = req.params;
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
    where: { id: eventId, userId },
  });
  res.status(StatusCodes.OK).json({ event, errors: null });
});

const deleteEvent = asyncWrapper(async (req, res) => {
  const { id: userId } = req.user;
  const { eventId } = req.params;

  // Delete from database
  const delEvent = await database.events
    .delete({ where: { id: eventId, userId } })
    .catch((error) => error.meta);
  res.status(StatusCodes.OK).json({
    event: delEvent ? delEvent : null,
    errors: delEvent?.cause ? delEvent.cause : null,
  });
});

const addUserIntInEvent = asyncWrapper(async (req, res) => {
  const { eventId, userId } = req.params;
  // Query the database if userId and eventId exists
  const isMember = await findUser(userId, eventId);

  if (isMember) {
    return res
      .status(400)
      .json({ message: "This user is already interested in the event" });
  }

  await addUserToEvent(userId, eventId);
  return res
    .status(StatusCodes.CREATED)
    .json({ message: "User added to event" });
});

const removeUserUnIntInEvent = asyncWrapper(async (req, res) => {
  const { userId, eventId } = req.params;
  const isAMember = await findUser(userId, eventId);
  if (!isAMember) {
    return res.status(400).json({ message: "User not found in event group" });
  }

  // Remove user from the group
  await removeUserFromEvent(userId, eventId);
  return res
    .status(StatusCodes.OK)
    .json({ message: "User removed from event" });
});
export {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
  addUserIntInEvent,
  removeUserUnIntInEvent,
};
