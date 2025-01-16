import Joi from "joi";
import { RegisterDto } from "../../dto/auth";
import { Role } from "@prisma/client";

export const RegisterSchema = Joi.object<RegisterDto>({
  fullname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string().min(10).max(15).required(),
  address: Joi.string().required(),
  gender: Joi.string(),
  role: Joi.string().valid(Role.ADMIN, Role.USER),
});

export const LoginSchema = Joi.object<RegisterDto>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
