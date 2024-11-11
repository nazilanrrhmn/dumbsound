import { LoginDto, RegisterDto } from "../dto/auth";
import { PrismaClient } from "@prisma/client";
import * as userRepositories from "../repositories/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (registerInfo: RegisterDto) => {
  const existedUser = await userRepositories.findUserByEmailOrUsername(
    registerInfo.email
  );

  if (existedUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(registerInfo.password, 10);
  const generatedUsername = registerInfo.email.split("@")[0];

  const createUser = await userRepositories.createUser({
    ...registerInfo,
    username: generatedUsername,
    password: hashedPassword,
  });

  return createUser;
};

export const login = async (loginInfo: LoginDto) => {
  const user = await userRepositories.findUserByEmailOrUsername(
    loginInfo.email
  );

  if (!user) {
    throw new Error("User not found");
  }

  const isValidPassword = await bcrypt.compare(
    loginInfo.password,
    user.password
  );

  if (!isValidPassword) {
    throw new Error("User not found!");
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    },
    process.env.JWT_SECRET_KEY as string,
    {
      expiresIn: "1d",
    }
  );
  return token;
};
