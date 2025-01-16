export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  fullname: string;
  phone: string;
  address: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  role: "USER" | "ADMIN";
  username?: string;
}

export interface UpdateUserDto extends Record<string, any> {
  username?: string;
  email?: string;
  password?: string;
}
