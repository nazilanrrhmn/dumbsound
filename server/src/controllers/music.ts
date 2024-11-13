import { Request, Response } from "express";
import * as musicServices from "../services/music";
import cloudinaryServices from "../services/cloudinary";
import { addMusicSchema } from "../utils/schemas/music";

export const createMusic = async (req: Request, res: Response) => {
  try {
    const fileUpload = req.files as {
      [fieldname: string]: Express.Multer.File[] | undefined;
    };
    const body = req.body;

    if (fileUpload && fileUpload.music) {
      const music = fileUpload.music[0];
      const musicUpload = await cloudinaryServices.musicUpload(
        music as Express.Multer.File
      );
      body.fileUrl = musicUpload.secure_url;
    }

    if (fileUpload && fileUpload.thumbnail) {
      const thumbnail = fileUpload.thumbnail[0];
      const thumbnailUpload = await cloudinaryServices.upload(
        thumbnail as Express.Multer.File
      );
      body.thumbnails = thumbnailUpload.secure_url;
    }

    const value = await addMusicSchema.validateAsync(body);
    const music = await musicServices.createMusic(value);

    res.json({
      message: "Music created successfully",
      music,
    });
  } catch (error) {
    console.log(error);
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};

export const getAllMusic = async (req: Request, res: Response) => {
  try {
    const music = await musicServices.getAllMusic();
    res.status(200).json(music);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
