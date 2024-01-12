import express from "express";

import { login, register, validationUser } from "./users.service.js";
import { loginValidation, userRegisterValidation } from "./users.validation.js";
import { User } from "./users.model.js";
import bcrypt from "bcrypt";
const router = express.Router();

//?==========================================Typescript in react====================================================================================

//!Register ====================
router.post("/users/registerUser", validationUser, register);

//!get users=========================
router.post("/users/login", login);
export default router;
