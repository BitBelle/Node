import { Router } from "express";
import { registerUser,loginUser, welcomePage} from "../Controllers/authController";
import { verifyToken } from "../middlewares";


const authRoutes = Router()

authRoutes.post("/register", registerUser)
authRoutes.post("/login", loginUser)
authRoutes.get("", verifyToken, welcomePage)
authRoutes.get("", verifyToken, welcomePage)




export default authRoutes