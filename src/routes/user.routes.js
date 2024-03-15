import { Router } from "express";
import { contact } from "../controllers/user.controller.js";

const router = Router();

router.route("/contact").post(contact)

export default router;