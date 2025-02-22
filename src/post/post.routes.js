import { Router } from "express";
import { createPost, editPost, deletePost } from "./post.controller.js";
import { createPostValidator, editPostValidator, deletePostValidator } from "../middlewares/post-validators.js";

const router = Router();

/**
 * @swagger
 * /post:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               auth:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Post has been created
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/post", createPostValidator, createPost);

/**
 * @swagger
 * /editPost:
 *   put:
 *     summary: Edit an existing post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               auth:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post has been updated
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.put("/editPost/:pid", editPostValidator, editPost);

/**
 * @swagger
 * /deletePost:
 *   delete:
 *     summary: Delete an existing post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               auth:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post has been deleted
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.delete("/deletePost/:pid", deletePostValidator, deletePost);

export default router;