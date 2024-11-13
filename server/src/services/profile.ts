import { cloudinary } from "../libs/cloudinary";
import fs from "fs";
import * as profileRepositories from "../repositories/profile";
import { UpdateProfileDto } from "../dto/profile";

export const getProfileByUserId = async (userId: number) => {
  return await profileRepositories.getProfileByUserId(userId);
};

export const updateProfile = async (userId: number, data: UpdateProfileDto) => {
  const { username, fullname, gender, phone, address, avatarUrl } = data;
  console.log(data);

  try {
    return await profileRepositories.updateProfile(userId, {
      username,
      fullname,
      gender,
      phone,
      address,
      avatar: avatarUrl,
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update profile");
  }
};
