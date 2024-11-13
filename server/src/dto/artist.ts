import { typeArtist } from "@prisma/client";

export interface CreateArtistDto {
  name: string;
  age?: number;
  type: typeArtist;
  bio?: string;
}
