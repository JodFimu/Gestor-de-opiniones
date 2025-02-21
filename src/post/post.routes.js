import { Router } from "express";
import { createPost } from "./post.controller.js";
import { createPostValidator } from "../middlewares/post-validators.js"

const router = Router();

router.post("/post", createPostValidator, createPost)
router.put("/editPost")

export default router