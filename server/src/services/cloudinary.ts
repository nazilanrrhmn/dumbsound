import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

class CloudinaryServices {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  // Upload Music
  async musicUpload(file: Express.Multer.File) {
    try {
      // Convert file buffer to Base64
      const b64 = Buffer.from(file.buffer).toString("base64");
      const dataURI = `data:${file.mimetype};base64,${b64}`;

      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(dataURI, {
        folder: `${process.env.CLOUDINARY_UPLOAD_FOLDER}/music`,
        resource_type: "video", // Specify resource type as "video" for audio files
        use_filename: true,
        unique_filename: false,
      });

      return result;
    } catch (error) {
      console.error("Error uploading music to Cloudinary:", error);
      throw new Error("Failed to upload music to Cloudinary.");
    }
  }

  // Upload Thumbnail
  async upload(file: Express.Multer.File) {
    try {
      // Convert file buffer to Base64
      const b64 = Buffer.from(file.buffer).toString("base64");
      const dataURI = `data:${file.mimetype};base64,${b64}`;

      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(dataURI, {
        folder: `${process.env.CLOUDINARY_UPLOAD_FOLDER}/thumbnails`,
        transformation: [
          { width: 500, height: 500, crop: "limit" }, // Resize image if needed
        ],
        use_filename: true,
        unique_filename: false,
      });

      return result;
    } catch (error) {
      console.error("Error uploading thumbnail to Cloudinary:", error);
      throw new Error("Failed to upload thumbnail to Cloudinary.");
    }
  }
}

export default new CloudinaryServices();
