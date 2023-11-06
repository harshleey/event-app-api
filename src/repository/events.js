import { database } from "../libs/prisma.js";

const addUserToEvent = async (userId, eventId) => {
  const IntMember = await database.IntEvent.create({
    data: {
      userId,
      eventId,
    },
  });
  return IntMember;
};

const findUser = async (userId, eventId) => {
  const isMember = await database.IntEvent.findFirst({
    where: { eventId, userId },
  });
  return isMember ? true : false;
};

const findEvent = async (eventId) => {
  const event = await database.events.findUnique({
    where: { id: eventId },
  });
  return event;
};

const removeUserFromEvent = async (userId, eventId) => {
  const member = await database.IntEvent.deleteMany({
    where: { userId, eventId },
  });
  return member;
};

export { addUserToEvent, findUser, removeUserFromEvent, findEvent };
