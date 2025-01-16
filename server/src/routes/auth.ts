import { Router } from "express";
import * as authControllers from "../controllers/auth";
import { authentication } from "../middlewares/authentication";

const authRouter = Router();

authRouter.post("/login", authControllers.login);
authRouter.post("/register", authControllers.register);
authRouter.get("/me", authentication, authControllers.getUserLogged);

export default authRouter;
