import { Router } from "express";
import { register, login } from "./auth.controller.js";
import { registerValidator, loginValidator } from "../middlewares/user-validators.js";

const router = Router();

router.post("/register",registerValidator,register);

router.post("/login", uploadProfilePicture.single("profilePicture"), loginValidator,login);

export default router;