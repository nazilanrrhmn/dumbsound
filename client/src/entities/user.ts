import { roleEnum } from "@/types/user";

export interface UserEntity {
  id: number;
  email: string;
  password: string;
  username: string;
  profile: ProfileEntity;
  role: roleEnum;
}
