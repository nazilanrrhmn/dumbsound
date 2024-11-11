import * as musicRepositories from "../repositories/music";
import cloudinary from "../config/cloudinary";
import fs from "fs";

interface CreateMusicData {
  title: string;
  artistId: number;
  year: number;
  musicFile: Express.Multer.File;
  thumbnailFile: Express.Multer.File;
}

export const createMusic = async (data: CreateMusicData) => {
  const { title, year, artistId, musicFile, thumbnailFile } = data;
  console.log(data);

  try {
    // Upload music and thumbnail files to Cloudinary
    const musicResult = await cloudinary.uploader.upload(musicFile.path, {
      resource_type: "video",
    });
    const thumbnailResult = await cloudinary.uploader.upload(
      thumbnailFile.path,
      { resource_type: "image" }
    );

    // Clean up local files
    fs.unlinkSync(musicFile.path);
    fs.unlinkSync(thumbnailFile.path);

    // Save music record in the database
    return await musicRepositories.createMusic({
      title,
      artistId,
      year,
      fileUrl: musicResult.secure_url,
      thumbnails: thumbnailResult.secure_url,
    });
  } catch (error) {
    throw new Error("Failed to upload music files");
  }
};

// export const createMusic = async (data: {
//   title: string;
//   artistId: number;
//   fileUrl: string;
//   thumbnails: string;
// }) => {
//   return await musicRepositories.createMusic(data);
// };

export const getMusicById = async (id: number) => {
  return await musicRepositories.getMusicById(id);
};

export const getAllMusic = async () => {
  return await musicRepositories.getAllMusic();
};
