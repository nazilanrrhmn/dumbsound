import { AddMusicDto } from "../../dto/music";
import Joi from "joi";

export const addMusicSchema = Joi.object<AddMusicDto>({
  title: Joi.string().required(),
  year: Joi.number().required(),
  artistId: Joi.number().required(),
  fileUrl: Joi.string().uri().required(),
  thumbnails: Joi.string().uri().required(),
});
