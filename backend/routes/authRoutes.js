import express from "express"
import { deleteUser, getAllUsers, loginUser, logoutUser, registerUser } from "../controllers/authController.js";
import { admin, authMiddleware } from "../middlewares/authMiddleware.js";

const authRouter = express.Router()

authRouter.post("/register",registerUser)
authRouter.post("/login",loginUser)
authRouter.post("/logout",logoutUser)
authRouter.get("/users",authMiddleware,admin,getAllUsers)
authRouter.delete("/:id",authMiddleware,admin, deleteUser);


export default authRouter;