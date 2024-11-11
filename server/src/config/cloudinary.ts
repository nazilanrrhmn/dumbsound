import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Avatar upload
export const uploadAvatar = async (file: Express.Multer.File) => {
  const result = await cloudinary.uploader.upload(file.path, {
    folder: "avatars",
    resource_type: "image",
  });
  return result.url;
};

export default cloudinary;
