import Router from "express"
import { createComment } from "./comment.controller.js";
import { createCommentValidator } from "../middlewares/comment-validators.js";

const router = Router();

router.post("/comment/:post", createCommentValidator, createComment);

export default router;