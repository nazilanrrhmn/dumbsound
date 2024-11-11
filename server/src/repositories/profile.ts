import { PrismaClient } from "@prisma/client";
import { UpdateProfileDto } from "../dto/profile";

const prisma = new PrismaClient();

export const getProfileByUserId = async (userId: number) => {
  return await prisma.profile.findUnique({
    where: {
      userId,
    },
  });
};

export const updateProfile = async (
  userId: number,
  data: Partial<UpdateProfileDto>
) => {
  return await prisma.profile.update({
    where: {
      userId,
    },
    data: {
      fullname: data.fullname,
      avatar: data.avatarUrl,
      gender: data.gender,
    },
  });
};
