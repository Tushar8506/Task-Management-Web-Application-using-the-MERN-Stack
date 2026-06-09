import express from "express"
import authController from "../controllers/auth.controller.js"
// const authMiddleware= require("../middleware/auth.middleware")

const router = express.Router()


//user register
router.post("/register",authController.authRegister)


// user login
router.post("/login",authController.authLogin)


//user logout
router.post("/logout",authController.logOutUser)

export default router 