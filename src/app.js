import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.set("trust proxy", true);

import userRouter from "./routes/user.routes.js";
import postBlog from "./routes/blog.routes.js";


app.use("/api/v1/users", userRouter);
app.use("/api/v1/blog", postBlog);
