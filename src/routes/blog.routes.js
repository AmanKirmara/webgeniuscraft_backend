import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { uploadPost, getAllPosts } from "../controllers/post.controller.js";

const router = Router();

router.route("/")
.post(upload.single("imageFile"), uploadPost)
.get(getAllPosts);


export default router;
