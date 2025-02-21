import { Router } from "express";
import { createPost, editPost,deletePost } from "./post.controller.js";
import { createPostValidator, editPostValidator, deletePostValidator } from "../middlewares/post-validators.js"

const router = Router();

router.post("/post", createPostValidator, createPost)
router.put("/editPost", editPostValidator, editPost)
router.delete("/deletePost", deletePostValidator, deletePost)

export default router