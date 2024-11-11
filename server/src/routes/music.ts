import { Router } from "express";
import * as musicControllers from "../controllers/music";
import { upload } from "../middlewares/upload";

const musicRouter = Router();

musicRouter.post(
  "/create",
  upload.fields([
    { name: "fileUrl", maxCount: 1 },
    { name: "thumbnails", maxCount: 1 },
  ]),
  musicControllers.createMusic
);
musicRouter.get("/", musicControllers.getAllMusic);

export default musicRouter;
