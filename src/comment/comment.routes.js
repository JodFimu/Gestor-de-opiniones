import Router from "express"
import { createComment, editComment, deleteComment } from "./comment.controller.js";
import { createCommentValidator, editCommentValidator, deleteCommentValidator } from "../middlewares/comment-validators.js";

const router = Router();

router.post("/comment/:post", createCommentValidator, createComment);
router.patch("/editComment/:oid", editCommentValidator, editComment);
router.delete("/deleteComment/:oid", deleteCommentValidator, deleteComment);

export default router;