import {body } from 'express-validator';
import { categoryExist } from '../helpers/db-validators.js';
import { validarCampos } from './validate-fields.js';
import { handleErrors } from './handle-errors.js';


export const createCategoryValidator = [
    body("name").notEmpty().withMessage('El nombre es requerido'),
    body("description").notEmpty().withMessage('La descripción es requerida'),
    body("name").custom(categoryExist),
    validarCampos,
    handleErrors
]