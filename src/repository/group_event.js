import { database } from "../libs/prisma.js";

const addEventGroup = async (groupId, eventId) => {
  const newEvent = await database.groupEvents.create({
    data: {
      groupId,
      eventId,
    },
  });
  return newEvent;
};

const findEvent = async (groupId, eventId) => {
  try {
    const isEvent = await database.groupEvents.findFirst({
      where: { groupId, eventId },
    });
    return isEvent ? true : false;
  } catch (error) {
    console.error("An error occurred while querying the database:", error);
    // You might want to return an error indicator or throw the error here.
  }
};

const removeEventFromGroup = async (groupId, eventId) => {
  const deletedEvent = await database.groupEvents.deleteMany({
    where: { groupId, eventId },
  });
  return deletedEvent;
};

export { addEventGroup, findEvent, removeEventFromGroup };
