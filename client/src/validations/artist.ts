import { z } from "zod";
import { ArtistTypeEnum } from "../types/artist";

export const addArtistSchema = z.object({
  name: z.string().min(1, "Name is required"),
  bio: z.string(),
  age: z.number(),
  type: z.enum(
    [ArtistTypeEnum.SOLO, ArtistTypeEnum.DUO, ArtistTypeEnum.GROUP],
    {
      errorMap: () => ({ message: "Artist typr must be Solo, Duo or Group" }),
    }
  ),
});

export type AddArtistDTO = z.infer<typeof addArtistSchema>;
