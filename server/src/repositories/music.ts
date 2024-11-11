import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface CreateMusicData {
  title: string;
  fileUrl: string;
  thumbnails: string;
  year: number;
  artistId: number;
}

export const createMusic = async (data: CreateMusicData) => {
  return await prisma.music.create({
    data: {
      title: data.title,
      artistId: data.artistId,
      fileUrl: data.fileUrl,
      thumbnails: data.thumbnails,
      year: data.year,
    },
  });
};

// export const createMusic = async (data: {
//   title: string;
//   artistId: number;
//   fileUrl: string;
//   thumbnails: string;
// }) => {
//   return await prisma.music.create({
//     data: { ...data },
//   });
// };

export const getMusicById = async (id: number) => {
  return await prisma.music.findUnique({
    where: { id },
  });
};

export const getAllMusic = async () => {
  return await prisma.music.findMany();
};
