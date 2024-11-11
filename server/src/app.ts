import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes will be added here
app.use("/api", router);

export default app;
