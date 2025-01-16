import { CreateArtistDto } from "../../dto/artist";
import { typeArtist } from "@prisma/client";
import Joi from "joi";

export const addArtistSchema = Joi.object<CreateArtistDto>({
  name: Joi.string().required(),
  age: Joi.number(),
  bio: Joi.string(),
  type: Joi.string().valid(typeArtist.DUO, typeArtist.GROUP, typeArtist.SOLO),
});
