import { Router } from "express";
import * as musicControllers from "../controllers/music";
import upload from "../middlewares/upload";
import { authentication } from "../middlewares/authentication";
import authorization from "../middlewares/authorization";

const musicRouter = Router();

musicRouter.post(
  "/create",
  authentication,
  authorization("ADMIN"),
  upload.fields([
    { name: "fileUrl", maxCount: 1 }, // Field untuk musik
    { name: "thumbnails", maxCount: 1 }, // Field untuk thumbnail
  ]),
  musicControllers.createMusic
);
musicRouter.get("/", musicControllers.getAllMusic);

export default musicRouter;
