import { Request, Response } from "express";
import * as musicServices from "../services/music";

export const createMusic = async (req: Request, res: Response) => {
  const { title, artistId, year } = req.body;

  // Validate required fields
  if (!title || !artistId) {
    res.status(400).json({ message: "Title and artistId are required" });
    return;
  }

  // Cast `req.files` to the expected type to prevent TypeScript errors
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  // Check if music and thumbnail files are present
  if (!files || !files["fileUrl"] || !files["thumbnails"]) {
    res.status(400).json({ message: "Music file and thumbnail are required" });
    return;
  }

  const musicFile = files["fileUrl"][0];
  const thumbnailFile = files["thumbnails"][0];

  try {
    const music = await musicServices.createMusic({
      title,
      artistId: parseInt(artistId),
      year,
      musicFile,
      thumbnailFile,
    });

    res.status(201).json({ message: "Music created successfully", music });
    return;
  } catch (error: any) {
    console.error("Error creating music:", error.message || error);
    res.status(500).json({
      message: "Failed to create music",
      error: error.message || error,
    });
    return;
  }
};

// export const createMusic = async (req: Request, res: Response) => {
//   const { title, artistId, fileUrl, thumbnails } = req.body;
//   try {
//     const music = await musicServices.createMusic({
//       title,
//       artistId,
//       fileUrl,
//       thumbnails,
//     });
//     res.status(201).json(music);
//   } catch (error) {
//     res.status(500).json({ message: error });
//   }
// };

export const getAllMusic = async (req: Request, res: Response) => {
  try {
    const music = await musicServices.getAllMusic();
    res.status(200).json(music);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
