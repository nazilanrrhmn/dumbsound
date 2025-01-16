import { Router } from "express";
import * as artistControllers from "../controllers/artist";
import { authentication } from "../middlewares/authentication";
import authorization from "../middlewares/authorization";

const artistRouter = Router();

artistRouter.post(
  "/create",
  authentication,
  authorization("ADMIN"),
  artistControllers.createArtist
);
artistRouter.get("/:id", artistControllers.getArtistById);
artistRouter.get("/", artistControllers.getAllArtists);
artistRouter.put(
  "/update/:id",
  authentication,
  authorization("ADMIN"),
  artistControllers.updateArtist
);
artistRouter.delete(
  "/del/:id",
  authentication,
  authorization("ADMIN"),
  artistControllers.deleteArtist
);

export default artistRouter;
