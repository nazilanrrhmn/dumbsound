import { Router } from "express";
import * as musicControllers from "../controllers/music";
import upload from "../middlewares/upload";

const musicRouter = Router();

musicRouter.post(
  "/create",
  upload.fields([
    {
      name: "music",
      maxCount: 1,
    },
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  musicControllers.createMusic
);
musicRouter.get("/", musicControllers.getAllMusic);

export default musicRouter;
