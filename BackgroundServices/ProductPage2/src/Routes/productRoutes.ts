import {Router} from "express"
import { addProduct, getProducts,getProduct, updateProduct, deleteProduct} from "../Controllers/productController"
import { verifyToken } from "../middlewares"

const productRoute = Router()

productRoute.post("",verifyToken, addProduct)
productRoute.get("", getProducts)
productRoute.get("/:id", getProduct)
productRoute.patch("/:id",verifyToken, updateProduct)
productRoute.delete("/:id",verifyToken, deleteProduct)


export default productRoute