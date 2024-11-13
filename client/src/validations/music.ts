import { z } from "zod";

export const addMusicSchema = z.object({
  title: z.string().min(1, "Title is required"),
  year: z.number(),
  artistId: z.number(),
  fileUrl: z.any(),
  thumbnails: z.any(),
});

export type AddMusicDTO = z.infer<typeof addMusicSchema>;
