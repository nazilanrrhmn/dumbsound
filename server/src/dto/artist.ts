export interface CreateArtistDto {
  name: string;
  age: string;
  type: "SOLO" | "DUO" | "GROUP";
  bio: string;
}
