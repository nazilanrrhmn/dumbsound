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
    throw {
      status: "fail",
      message: "Email already exists",
    };
  }

  const hashedPassword = await bcrypt.hash(registerInfo.password, 10);
  let generateUsername;
  let existedUsername;

  do {
    const randomMath = Math.floor(Math.random() * 1000);
    const emailSplit = registerInfo.email.split("@")[0];
    generateUsername = `${emailSplit}${randomMath}`;

    existedUsername = await userRepositories.getUserByUsername(
      generateUsername
    );
  } while (existedUsername);

  const { password, ...createdUser } = await userRepositories.createUser({
    ...registerInfo,
    username: generateUsername,
    password: hashedPassword,
  });

  return createdUser;
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
    throw {
      status: "fail",
      message: "Invalid credentials",
    };
  }

  const { password, ...userToSign } = user;
  const screetKey = process.env.JWT_SECRET_KEY as string;
  const accessToken = jwt.sign(userToSign, screetKey);

  return {
    user: userToSign,
    accessToken,
  };
};

export const getUserLogged = async (id: number) => {
  const user = await userRepositories.findUserById(id);

  if (!user) {
    throw {
      status: "fail",
      message: "Invalid user",
    };
  }
  return user;
};
