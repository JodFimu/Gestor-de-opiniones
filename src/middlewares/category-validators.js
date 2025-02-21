import {body } from 'express-validator';
import { categoryExist } from '../helpers/db-validators.js';
import { validarCampos } from './validate-fields.js';
import { handleErrors } from './handle-errors.js';
import { validateJWT } from './validate-jwt.js';
import { hasRoles } from './validate-roles.js';


export const createCategoryValidator = [
    validateJWT,
    hasRoles('ADMIN_ROLE'),
    body("name").notEmpty().withMessage('El nombre es requerido'),
    body("description").notEmpty().withMessage('La descripción es requerida'),
    body("name").custom(categoryExist),
    validarCampos,
    handleErrors
]

export const editCategoryValidator = [
    validateJWT,
    hasRoles('ADMIN_ROLE'),
    body("name").custom(categoryExist),
    validarCampos,
    handleErrors
]

export const deleteCategoryValidator = [
    validateJWT,
    hasRoles('ADMIN_ROLE'),
    validarCampos,
    handleErrors
]
