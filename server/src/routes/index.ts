import { Router } from "express";
import authRouter from "./auth";
import profileRouter from "./profile";
import musicRouter from "./music";
import artistRouter from "./artist";

export const router = Router();

router.get("/", (req, res) => {
  res.send("ROOT ROUTER EXPRESS APP");
});

router.use("/auth", authRouter);
router.use("/profile", profileRouter);
router.use("/music", musicRouter);
router.use("/artist", artistRouter);

export default router;
