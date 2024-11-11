import { Router } from "express";
import * as authControllers from "../controllers/auth";

const authRouter = Router();

authRouter.post("/login", authControllers.login);
authRouter.post("/register", authControllers.register);
authRouter.get("/me", authControllers.authCheck);

export default authRouter;
