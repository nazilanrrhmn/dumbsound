import * as musicRepositories from "../repositories/music";
import { AddMusicDto } from "../dto/music";

export const createMusic = async (body: AddMusicDto) => {
  return await musicRepositories.createMusic(body);
};

export const getMusicById = async (id: number) => {
  return await musicRepositories.getMusicById(id);
};

export const getAllMusic = async () => {
  return await musicRepositories.getAllMusic();
};
