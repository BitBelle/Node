import {Router} from "express"
import { addCategory, getCategories} from "../Controllers/categoryController"
import { verifyToken } from "../middlewares"

const categoryRoute = Router()

categoryRoute.post("", verifyToken, addCategory)
categoryRoute.get("",  getCategories)
// categoryRoute.get("/:id", getCategory)



export default categoryRoute