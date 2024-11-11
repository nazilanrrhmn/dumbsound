import { Router } from "express";
import * as profileControllers from "../controllers/profile";
import { upload } from "../middlewares/upload";

const profileRouter = Router();

profileRouter.post("/:userId", profileControllers.getProfileByUserId);
profileRouter.put(
  "/update/:userId",
  upload.single("avatar"),
  profileControllers.updateProfile
);

export default profileRouter;
