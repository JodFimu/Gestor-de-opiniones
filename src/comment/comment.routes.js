import Router from "express";
import { createComment, editComment, deleteComment } from "./comment.controller.js";
import { createCommentValidator, editCommentValidator, deleteCommentValidator } from "../middlewares/comment-validators.js";

const router = Router();

/**
 * @swagger
 * /comment/{post}:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: post
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/comment/:post", createCommentValidator, createComment);

/**
 * @swagger
 * /editComment/{oid}:
 *   patch:
 *     summary: Edit an existing comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: oid
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       400:
 *         description: Invalid input
 */
router.patch("/editComment/:oid", editCommentValidator, editComment);

/**
 * @swagger
 * /deleteComment/{oid}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: oid
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       400:
 *         description: Invalid input
 */
router.delete("/deleteComment/:oid", deleteCommentValidator, deleteComment);

export default router;