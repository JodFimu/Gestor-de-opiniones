import {createCategory} from './category.controller.js';
import {createCategoryValidator} from '../middlewares/category-validators.js';
import {Router} from 'express';

const router = Router();

router.post('/createCategory', createCategoryValidator, createCategory);

export default router;