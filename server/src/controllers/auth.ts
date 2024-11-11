import { NextFunction, Request, Response } from "express";
import * as authServices from "../services/auth";
import * as profileServices from "../services/profile";
import { LoginDto, RegisterDto } from "../dto/auth";

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const dataUserForLogin = req.body as LoginDto;
    const token = await authServices.login(dataUserForLogin);

    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
}

export async function register(req: Request, res: Response) {
  try {
    const bodyRegister = req.body as RegisterDto;
    const user = await authServices.register(bodyRegister);
    res.json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
}
export const authCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    const profile = await profileServices.getProfileByUserId(user.id);
    res.json(profile);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
