export interface UpdateProfileDto extends Record<string, any> {
  username?: string;
  fullname?: string;
  avatar?: string | { [key: string]: Express.Multer.File[] };
  phone?: string;
  address?: string;
  gender: "MALE" | "FEMALE" | "OTHER";
}
