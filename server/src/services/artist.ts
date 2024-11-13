import * as artistRepository from "../repositories/artist";
import { CreateArtistDto } from "../dto/artist";

// Create a new artist
export const createArtist = async (body: CreateArtistDto) => {
  return await artistRepository.createArtist(body);
};

// Get an artist by ID
export const getArtistById = async (id: number) => {
  const artist = await artistRepository.getArtistById(id);
  if (!artist) {
    throw new Error("Artist not found");
  }
  return artist;
};

// Get all artists
export const getAllArtists = async () => {
  return await artistRepository.getAllArtists();
};

// Update an artist
export const updateArtist = async (
  id: number,
  data: Partial<CreateArtistDto>
) => {
  const artist = await artistRepository.getArtistById(id);
  if (!artist) {
    throw new Error("Artist not found");
  }
  return await artistRepository.updateArtist(id, data);
};

// Delete an artist
export const deleteArtist = async (id: number) => {
  const artist = await artistRepository.getArtistById(id);
  if (!artist) {
    throw new Error("Artist not found");
  }
  return await artistRepository.deleteArtist(id);
};
