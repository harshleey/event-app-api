import { database } from "../libs/prisma.js";

const addGroup = async (title, userId) => {
  const createdGroup = await database.groups.create({
    data: {
      title,
      userId,
    },
  });
  return createdGroup;
};

const readGroupById = async (groupId) => {
  const group = await database.groups.findUnique({
    where: { id: groupId },
  });
  return group;
};

const updatesGroup = async (title, groupId, userId) => {
  const updatedGroup = database.groups.update({
    data: {
      title,
    },
    where: { id: groupId, userId },
  });
  return updatedGroup;
};

const deletesGroup = async (groupId, userId) => {
  const deletedGroup = await database.groups.delete({
    where: { id: groupId, userId },
  });
  return deletedGroup;
};

export { addGroup, updatesGroup, readGroupById, deletesGroup };
