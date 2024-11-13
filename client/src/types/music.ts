import { IArtist } from "./artist";

export interface IMusic {
  id: number;
  thumbnails: string;
  fileUrl: string;
  title: string;
  year: number;
  artist: IArtist;
}
