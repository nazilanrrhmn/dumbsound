import { Request, Response } from "express";
import * as profileServices from "../services/profile";
import cloudinaryServices from "../services/cloudinary";

export const getProfileByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const profile = await profileServices.getProfileByUserId(Number(userId));
    if (profile) {
      res.status(200).json(profile);
    } else {
      res.status(404).json({ message: "Profile not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  const { fullname, phone, address, gender, username } = req.body;
  const userId = parseInt(req.params.userId);

  try {
    const avatarFile = req.file; // Single file for avatar

    // Jika ada file avatar, lakukan unggahan ke Cloudinary
    let avatarUrl = undefined;
    if (avatarFile) {
      const avatarUpload = await cloudinaryServices.upload(avatarFile);
      avatarUrl = avatarUpload.secure_url;
    }

    const profile = await profileServices.updateProfile(userId, {
      fullname,
      phone,
      address,
      gender,
      username,
      avatarUrl,
    });

    res.status(200).json({ message: "Profile updated successfully", profile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update profile", error });
  }
};
