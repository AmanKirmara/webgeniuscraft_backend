import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
dotenv.config()

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOrigins = process.env.CORS_ORIGIN.split(',');
app.use(cors({ origin: corsOrigins, credentials: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.set("trust proxy", true);

import userRouter from "./routes/user.routes.js";
import postBlog from "./routes/blog.routes.js";
userRouter

app.use("/api/v1/users", userRouter);
app.use("/api/v1/blog", postBlog);
