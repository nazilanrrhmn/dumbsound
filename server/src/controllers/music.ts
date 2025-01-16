import { Request, Response } from "express";
import * as musicServices from "../services/music";
import cloudinaryServices from "../services/cloudinary";
import { addMusicSchema } from "../utils/schemas/music";

// export const createMusic = async (req: Request, res: Response) => {
//   try {
//     const fileUpload = req.files as {
//       [fieldname: string]: Express.Multer.File[] | undefined;
//     };
//     const body = req.body;

//     if (fileUpload && fileUpload.music) {
//       const music = fileUpload.music[0];
//       const musicUpload = await cloudinaryServices.musicUpload(
//         music as Express.Multer.File
//       );
//       body.fileUrl = musicUpload.secure_url;
//     }

//     if (fileUpload && fileUpload.thumbnail) {
//       const thumbnail = fileUpload.thumbnail[0];
//       const thumbnailUpload = await cloudinaryServices.upload(
//         thumbnail as Express.Multer.File
//       );
//       body.thumbnails = thumbnailUpload.secure_url;
//     }

//     const value = await addMusicSchema.validateAsync(body);
//     const music = await musicServices.createMusic(value);

//     res.json({
//       message: "Music created successfully",
//       music,
//     });
//   } catch (error) {
//     console.log(error);
//     const err = error as Error;
//     res.status(500).json({ message: err.message });
//   }
// };

export const createMusic = async (req: Request, res: Response) => {
  try {
    // Extract files from request
    const fileUpload = req.files as {
      [fieldname: string]: Express.Multer.File[] | undefined;
    };
    const body = req.body;
    console.log("Data :", req.body);

    // Validate file presence
    if (!fileUpload || !fileUpload.fileUrl || !fileUpload.thumbnails) {
      res
        .status(400)
        .json({ message: "Both music and thumbnail files are required." });
      return;
    }

    // Upload music file
    const music = fileUpload.fileUrl[0];
    const musicUpload = await cloudinaryServices.musicUpload(music);

    // Upload thumbnail
    const thumbnail = fileUpload.thumbnails[0];
    const thumbnailUpload = await cloudinaryServices.upload(thumbnail);

    // Add Cloudinary URLs to the request body
    body.fileUrl = musicUpload.secure_url;
    body.thumbnails = thumbnailUpload.secure_url;

    // Validate request body
    const validatedData = await addMusicSchema.validateAsync(body);

    // Save music data to the database
    const musicData = await musicServices.createMusic(validatedData);

    res.status(201).json({
      message: "Music created successfully",
      music: musicData,
    });
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
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
