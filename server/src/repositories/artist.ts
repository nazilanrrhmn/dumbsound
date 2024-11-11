import { PrismaClient, Artist } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new artist
export const createArtist = async (data: Omit<Artist, "id">) => {
  return await prisma.artist.create({
    data,
  });
};

// Get an artist by ID
export const getArtistById = async (id: number) => {
  return await prisma.artist.findUnique({
    where: { id },
  });
};

// Get all artists
export const getAllArtists = async () => {
  return await prisma.artist.findMany();
};

// Update an artist
export const updateArtist = async (
  id: number,
  data: Partial<Omit<Artist, "id">>
) => {
  return await prisma.artist.update({
    where: { id },
    data,
  });
};

// Delete an artist
export const deleteArtist = async (id: number) => {
  return await prisma.artist.delete({
    where: { id },
  });
};
