import {body, param} from "express-validator"
import { validarCampos } from './validate-fields.js';
import { handleErrors } from './handle-errors.js';
import { validateJWT } from './validate-jwt.js';
import { hasRoles } from './validate-roles.js';

export const createPostValidator = [
    validateJWT,
    hasRoles("USER_ROLE"),
    body("category").isMongoId().withMessage("No es un id valido"),
    validarCampos,
    handleErrors
]

export const editPostValidator = [
    validateJWT,
    hasRoles("USER_ROLE"),
    param("pid").isMongoId().withMessage("No es un id valido"),
    body("category").isMongoId().withMessage("No es un id valido"),
    validarCampos,
    handleErrors
]

export const deletePostValidator = [
    validateJWT,
    hasRoles("USER_ROLE"),
    param("pid").isMongoId().withMessage("No es un id valido"),
    validarCampos,
    handleErrors
]