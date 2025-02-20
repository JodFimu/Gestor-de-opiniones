import { Router } from "express";
import {updateUserValidator, updatePasswordValidator, updateProfilePicValidator} from "../middlewares/user-validators.js";
import { updateUser, updatePassword, updatePicture } from "./user.controller.js";
import { uploadProfilePicture } from "../middlewares/multer-uploads.js";

const router = Router();

router.put("/updateUser", updateUserValidator, updateUser);
router.patch("/updatePassword", updatePasswordValidator, updatePassword);
router.patch("/updatePicture", updateProfilePicValidator, updatePicture);

export default router;