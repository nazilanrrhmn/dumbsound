import cloudinary from "../config/cloudinary";
import fs from "fs";
import * as profileRepositories from "../repositories/profile";
import { UpdateProfileDto } from "../dto/profile";

export const getProfileByUserId = async (userId: number) => {
  return await profileRepositories.getProfileByUserId(userId);
};

export const updateProfile = async (userId: number, data: UpdateProfileDto) => {
  const { username, fullname, gender, phone, address, avatarFile } = data;
  console.log(data);

  try {
    let avatarUrl;

    if (avatarFile) {
      const avatarResult = await cloudinary.uploader.upload(avatarFile.path, {
        resource_type: "image",
      });
      avatarUrl = avatarResult.secure_url;
      fs.unlinkSync(avatarFile.path);
    }

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
