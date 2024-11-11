import { Router } from "express";
import * as artistControllers from "../controllers/artist";

const artistRouter = Router();

artistRouter.post("/create", artistControllers.createArtist);
artistRouter.get("/:id", artistControllers.getArtistById);
artistRouter.get("/", artistControllers.getAllArtists);
artistRouter.put("/update/:id", artistControllers.updateArtist);
artistRouter.delete("/del/:id", artistControllers.deleteArtist);

export default artistRouter;
