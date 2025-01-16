import { Router } from "express";
import * as profileControllers from "../controllers/profile";
import upload from "../middlewares/upload";
import { authentication } from "../middlewares/authentication";

const profileRouter = Router();

profileRouter.post(
  "/:userId",
  authentication,
  profileControllers.getProfileByUserId
);
profileRouter.put(
  "/update/:userId",
  authentication,
  upload.single("avatar"),
  profileControllers.updateProfile
);

export default profileRouter;
