import { database } from "../libs/prisma.js";

const addUserToGroup = async (userId, groupId) => {
  const newGroup = await database.userGroups.create({
    data: {
      userId,
      groupId,
    },
  });
  return newGroup;
};

const findMember = async (userId, groupId) => {
  try {
    const isMember = await database.userGroups.findFirst({
      where: { groupId, userId },
    });
    console.log(isMember);
    return isMember ? true : false;
  } catch (error) {
    console.error("An error occurred while querying the database:", error);
    // You might want to return an error indicator or throw the error here.
  }
};

const removeMemberFromGroup = async (userId, groupId) => {
  const deletedGroup = await database.userGroups.deleteMany({
    where: { userId, groupId },
  });
  return deletedGroup;
};

export { addUserToGroup, findMember, removeMemberFromGroup };
