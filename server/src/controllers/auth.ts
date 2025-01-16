import { NextFunction, Request, Response } from "express";
import * as authServices from "../services/auth";
import * as profileServices from "../services/profile";
import { LoginDto, RegisterDto } from "../dto/auth";
import { LoginSchema, RegisterSchema } from "../utils/schemas/auth";

export async function login(req: Request, res: Response) {
  try {
    const dataUserForLogin = await LoginSchema.validateAsync(
      req.body as LoginDto
    );
    const data = await authServices.login(dataUserForLogin);

    res.json({
      message: "User logged successfully",
      data,
    });
  } catch (error) {
    console.log(error);

    const err = error as Error;
    res.status(400).json({
      message: err.message,
    });
  }
}

export async function register(req: Request, res: Response) {
  try {
    const bodyRegister = req.body as RegisterDto;
    const value = await RegisterSchema.validateAsync(bodyRegister);

    await authServices.register(value);
    const data = await authServices.login(value);

    res.json({
      message: "User registered successfully",
      data,
    });
  } catch (error) {
    console.log(error);

    const err = error as Error;
    res.status(500).json({
      message: err.message,
    });
  }
}

export async function getUserLogged(req: Request, res: Response) {
  try {
    const user = res.locals.user;
    const data = await authServices.getUserLogged(user.id);
    console.log(data);

    res.json({
      ...data,
    });
  } catch (error) {
    console.log(error);
    const err = error as Error;
    res.status(500).json({
      message: err.message,
    });
  }
}

// export const authCheck = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const user = res.locals.user;
//     const profile = await profileServices.getProfileByUserId(user.id);
//     res.json(profile);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: error });
//   }
// };
