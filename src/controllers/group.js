import { StatusCodes } from "http-status-codes";
import { database } from "../libs/prisma.js";
import { asyncWrapper } from "../middleware/asyncWrapper.js";
import {
  addUserToGroup,
  findMember,
  removeMemberFromGroup,
} from "../repository/user_group.js";
import {
  addGroup,
  deletesGroup,
  readGroupById,
  updatesGroup,
} from "../repository/group.js";
import {
  addEventGroup,
  findEvent,
  removeEventFromGroup,
} from "../repository/group_event.js";

// When creating a group, you simultaneously create a user group as well
const createGroup = asyncWrapper(async (req, res) => {
  const { id: userId } = req.user;
  const { title } = req.body;

  const newGroup = await addGroup(title, userId);
  const newUserGroup = await addUserToGroup(userId, newGroup.id);
  res
    .status(StatusCodes.CREATED)
    .json({ newGroup, newUserGroup, errors: null });
});

const getGroups = asyncWrapper(async (req, res) => {
  const groups = await database.groups.findMany();
  res.status(StatusCodes.OK).json({ groups, errors: null });
});

const getGroupById = asyncWrapper(async (req, res) => {
  const { groupId } = req.params;
  const group = await readGroupById(groupId);
  res.status(StatusCodes.OK).json({ group, errors: null });
});

const updateGroup = asyncWrapper(async (req, res) => {
  const { groupId } = req.params;
  const { title } = req.body;
  const { id: userId } = req.user;

  const group = await updatesGroup(title, groupId, userId);
  res.status(StatusCodes.OK).json({ group, errors: null });
});

const deleteGroup = asyncWrapper(async (req, res) => {
  const { id: userId } = req.user;
  const { groupId } = req.params;

  // Find the group to check if it exists and belongs to the user
  const existingGroup = await readGroupById(groupId);

  if (!existingGroup) {
    return res.status(StatusCodes.NOT_FOUND).json({
      groups: null,
      errors: "Group not found or not authorized for deletion",
    });
  }

  if (existingGroup.userId !== userId) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  // Delete the related UserGroups records
  await database.userGroups.deleteMany({
    where: { groupId },
  });

  // Delete the group
  const deletedGroup = await deletesGroup(groupId, userId);

  res.status(StatusCodes.OK).json({
    groups: deletedGroup,
    errors: null,
  });
});

const getGroupByUserId = asyncWrapper(async (req, res) => {
  const { id: userId } = req.user;
  const group = await database.groups.findUnique({
    where: { userId },
  });
  res.status(StatusCodes.OK).json({ group, errors: null });
});

const addUserGroup = asyncWrapper(async (req, res) => {
  const { userId, groupId } = req.params;
  const isMember = await findMember(userId, groupId);
  if (isMember) {
    return res
      .status(400)
      .json({ message: "This user is already a member of this group" });
  }
  await addUserToGroup(userId, groupId);
  return res
    .status(StatusCodes.CREATED)
    .json({ message: "User added to group" });
});

const removeUserGroup = asyncWrapper(async (req, res) => {
  const { userId, groupId } = req.params;
  const isAMember = await findMember(userId, groupId);
  if (!isAMember) {
    return res.status(400).json({ message: "User not found in group" });
  }

  // Remove user from the group
  await removeMemberFromGroup(userId, groupId);
  return res
    .status(StatusCodes.OK)
    .json({ message: "User removed from group" });
});

const addEventToGroup = asyncWrapper(async (req, res) => {
  const { groupId, eventId } = req.params;
  const isEvent = await findEvent(groupId, eventId);
  if (isEvent) {
    return res
      .status(400)
      .json({ message: "This event has already been added to the group" });
  }
  await addEventGroup(groupId, eventId);
  return res
    .status(StatusCodes.CREATED)
    .json({ message: "Event added to group" });
});

const delEventFromGroup = asyncWrapper(async (req, res) => {
  const { groupId, eventId } = req.params;
  const isEvent = await findEvent(groupId, eventId);
  if (!isEvent) {
    return res.status(400).json({ message: "Event not found in group" });
  }

  try {
    // Attempt to remove the event from the group
    await removeEventFromGroup(groupId, eventId);
    return res
      .status(StatusCodes.OK)
      .json({ message: "Event removed from group" });
  } catch (error) {
    console.error("An error occurred while deleting the event:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export {
  createGroup,
  getGroups,
  getGroupById,
  updateGroup,
  deleteGroup,
  addUserGroup,
  removeUserGroup,
  getGroupByUserId,
  addEventToGroup,
  delEventFromGroup,
};
