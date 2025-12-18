import { Router } from "express";
import { changePassword, forgotPassword, getProfile, login, logout, register, resetPassword, UpdateProfile } from "../controllers/User-controller.js";
import {isLoggedIn } from "../middlewares/auth_middle.js";
import upload from "../middlewares/Multer-middle.js";
 


const router = Router();

router.post('/register', upload.single("avatar"),register)
router.post('/login',login)
router.get('/logout',logout)
router.get('/me',isLoggedIn ,getProfile)
router.post('/reset',forgotPassword)
router.post('/reset/:resetToken',resetPassword)
router.post('/change-Password',isLoggedIn ,changePassword)
router.put('/update/:id',isLoggedIn ,upload.single('avatar'),UpdateProfile)

export default router