export interface UpdateProfileDto extends Record<string, any> {
  username?: string;
  fullname?: string;
  avatar?: string | Express.Multer.File;
  phone?: string;
  address?: string;
  gender: "MALE" | "FEMALE" | "OTHER";
}
