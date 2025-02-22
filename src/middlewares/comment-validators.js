import {body, param} from "express-validator"
import { validarCampos } from './validate-fields.js';
import { handleErrors } from './handle-errors.js';
import { validateJWT } from './validate-jwt.js';
import { hasRoles } from './validate-roles.js';

export const createCommentValidator = [
    validateJWT,
    hasRoles("USER_ROLE"),
    body("comment").notEmpty().withMessage("Comment is required"),
    param("post").isMongoId().withMessage("No es un id valido"),
    validarCampos,
    handleErrors
]