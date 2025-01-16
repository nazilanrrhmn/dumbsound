export interface IUser {
  id: number;
  username: string;
  email: string;
  role: roleEnum;
  profile: IProfile;
}

export enum roleEnum {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface IProfile {
  id: number;
  fullname?: string;
  avatar?: string;
  phone?: string;
  address?: string;
  gender?: genderEnum;
  userId: number;
}

export enum genderEnum {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}
