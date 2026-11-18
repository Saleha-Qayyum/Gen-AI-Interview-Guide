const {Router} = require('express')
const authController = require('../controller/auth.controller')
const authMiddleware = require('../middleware/auth.middleware')

const authRouter = Router()


/**
 * @Route /api/auth/register
 * @Description Register new user
 * @Access Public
 */
 authRouter.post("/register", authController.registerUser)
 /**
 * @Route /api/auth/login
 * @Description Login existing user with email and password
 * @Access Public
 */
 authRouter.post("/login", authController.logInUser)
/**
 * @Route /api/auth/logout
 * @Description Logout existing user and blacklisting its token
 * @Access Public
 */
 authRouter.get("/logout", authController.logOutUser)
/**
 * @Route /api/auth/get-info
 * @Description Fetch current user details and set it into a response
 * @Access Private
 */
 authRouter.get("/get-info", authMiddleware.authUser, authController.getInfoController)


module.exports = authRouter