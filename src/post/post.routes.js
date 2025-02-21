import { Router } from "express";
import { createPost, editPost } from "./post.controller.js";
import { createPostValidator, editPostValidator } from "../middlewares/post-validators.js"

const router = Router();

router.post("/post", createPostValidator, createPost)
router.put("/editPost", editPostValidator, editPost)

export default router