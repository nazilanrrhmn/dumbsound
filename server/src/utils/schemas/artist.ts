import { CreateArtistDto } from "../../dto/artist";
import { typeArtist } from "@prisma/client";
import Joi from "joi";

export const addArtistSchema = Joi.object<CreateArtistDto>({
  name: Joi.string().required(),
  age: Joi.string().required(),
  bio: Joi.string().required(),
  type: Joi.string()
    .valid(typeArtist.DUO, typeArtist.GROUP, typeArtist.SOLO)
    .required(),
});
