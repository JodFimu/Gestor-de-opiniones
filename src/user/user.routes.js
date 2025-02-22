import { Router } from "express";
import { updateUserValidator, updatePasswordValidator, updateProfilePicValidator } from "../middlewares/user-validators.js";
import { updateUser, updatePassword, updatePicture } from "./user.controller.js";
import { uploadProfilePicture } from "../middlewares/multer-uploads.js";

const router = Router();

/**
 * @swagger
 * /updateUser:
 *   put:
 *     summary: Update user information
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: ["ADMIN_ROLE", "USER_ROLE"]
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid input
 */
router.put("/updateUser", updateUserValidator, updateUser);

/**
 * @swagger
 * /updatePassword:
 *   patch:
 *     summary: Update user password
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Invalid input
 */
router.patch("/updatePassword", updatePasswordValidator, updatePassword);

/**
 * @swagger
 * /updatePicture:
 *   patch:
 *     summary: Update user profile picture
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               newProfilePic:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile picture updated successfully
 *       400:
 *         description: Invalid input
 */
router.patch("/updatePicture", uploadProfilePicture.single("newProfilePic"), updateProfilePicValidator, updatePicture);

export default router;