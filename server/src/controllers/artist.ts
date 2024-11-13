import { Request, Response } from "express";
import * as artistService from "../services/artist";
import { addArtistSchema } from "../utils/schemas/artist";

// Controller to create a new artist
export const createArtist = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    const value = await addArtistSchema.validateAsync(body);
    const artist = await artistService.createArtist(value);

    res.json({
      message: "Create artist successfuly",
      artist,
    });
  } catch (error) {
    console.log(error);
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};

// Controller to get an artist by ID
export const getArtistById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const artist = await artistService.getArtistById(Number(id));
    if (artist) {
      res.status(200).json(artist);
    } else {
      res.status(404).json({ message: "Artist not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// Controller to get all artists
export const getAllArtists = async (req: Request, res: Response) => {
  try {
    const artists = await artistService.getAllArtists();
    res.status(200).json(artists);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// Controller to update an artist by ID
export const updateArtist = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, age, type, bio } = req.body;

  try {
    const updatedArtist = await artistService.updateArtist(Number(id), {
      name,
      age,
      type,
      bio,
    });
    res.status(200).json(updatedArtist);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// Controller to delete an artist by ID
export const deleteArtist = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await artistService.deleteArtist(Number(id));
    res.status(200).json({ message: "Artist deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
