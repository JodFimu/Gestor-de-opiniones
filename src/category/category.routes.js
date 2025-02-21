import {createCategory, editCategory, deleteCategory} from './category.controller.js';
import {createCategoryValidator, editCategoryValidator, deleteCategoryValidator} from '../middlewares/category-validators.js';
import {Router} from 'express';

const router = Router();

router.post("/createCategory", createCategoryValidator, createCategory);
router.put("/editCategory/:cid", editCategoryValidator, editCategory);
router.delete("/deleteCategory/:cid",deleteCategoryValidator, deleteCategory);

export default router;