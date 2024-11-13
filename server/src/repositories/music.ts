import { PrismaClient } from "@prisma/client";
import { AddMusicDto } from "../dto/music";

const prisma = new PrismaClient();

export const createMusic = async (addMusicDto: AddMusicDto) => {
  return await prisma.music.create({
    data: addMusicDto,
  });
};

export const getMusicById = async (id: number) => {
  return await prisma.music.findUnique({
    where: { id },
  });
};

export const getAllMusic = async () => {
  return await prisma.music.findMany({
    include: {
      artist: true,
    },
  });
};
