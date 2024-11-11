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
  username?: string;
}

export interface UpdateUserDto {
  username?: string;
  email?: string;
  password?: string;
}
