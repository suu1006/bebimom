import path from "path";
import dotenv from "dotenv";

// env 파일 로드
dotenv.config({ path: path.resolve(__dirname, "../../.env") }); // 루트 .env
dotenv.config({ path: path.resolve(__dirname, "../.env") }); // backend/.env

import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth";
import { errorHandler } from "./middleware/errorHandler";
import morgan from "morgan";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: ["http://localhost:3000", "http://localhost:8081", "http://localhost:19006"], credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRouter);
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
