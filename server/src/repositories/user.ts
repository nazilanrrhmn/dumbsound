import { RegisterDto, UpdateUserDto } from "../dto/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findUserByEmailOrUsername = async (usernameOrEmail: string) => {
  return prisma.user.findFirst({
    where: {
      OR: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
    },
  });
};

export const createUser = async (registerDto: RegisterDto) => {
  return prisma.user.create({
    data: {
      email: registerDto.email,
      password: registerDto.password,
      username: registerDto.username!,
      profile: {
        create: {
          fullname: registerDto.fullname,
          gender: registerDto.gender,
          phone: registerDto.phone,
          address: registerDto.address,
        },
      },
    },
    include: {
      profile: true,
    },
  });
};

export const findUserAndProfile = async (username: string) => {
  return prisma.user.findFirst({
    where: {
      username,
    },
    select: {
      id: true,
      email: true,
      username: true,
      profile: true,
    },
  });
};

export const updateUser = async (id: number, data: Partial<UpdateUserDto>) => {
  return prisma.user.update({
    where: {
      id,
    },
    data: {
      ...data,
    },
  });
};
