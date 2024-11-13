export interface IArtist {
  id: number;
  name: string;
  age?: number;
  type: ArtistTypeEnum;
  bio?: string;
}

export enum ArtistTypeEnum {
  SOLO = "SOLO",
  DUO = "DUO",
  GROUP = "GROUP",
}
