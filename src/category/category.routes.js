import {createCategory, editCategory} from './category.controller.js';
import {createCategoryValidator, editCategoryValidator} from '../middlewares/category-validators.js';
import {Router} from 'express';

const router = Router();

router.post("/createCategory", createCategoryValidator, createCategory);
router.put("/editCategory/:cid", editCategoryValidator, editCategory);

export default router;