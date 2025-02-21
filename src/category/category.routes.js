import {createCategory, editCategory, deleteCategory} from './category.controller.js';
import {createCategoryValidator, editCategoryValidator, deleteCategoryValidator} from '../middlewares/category-validators.js';
import {Router} from 'express';

const router = Router();

/**
 * @swagger
 * /createCategory:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // ...define properties...
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/createCategory", createCategoryValidator, createCategory);

/**
 * @swagger
 * /editCategory/{cid}:
 *   put:
 *     summary: Edit an existing category
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // ...define properties...
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       400:
 *         description: Invalid input
 */
router.put("/editCategory/:cid", editCategoryValidator, editCategory);

/**
 * @swagger
 * /deleteCategory/{cid}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       400:
 *         description: Invalid input
 */
router.delete("/deleteCategory/:cid",deleteCategoryValidator, deleteCategory);

export default router;