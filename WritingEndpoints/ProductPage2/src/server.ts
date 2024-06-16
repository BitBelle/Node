import express,{json} from 'express'
import router from './Routes/productRoutes'
import productRoute from './Routes/productRoutes'
import categoryRoute from './Routes/categoryRoute'
import authRoutes from './Routes/authRoutes'
// import router from './Routes'
const app= express()

// middleware
app.use(json())

// routes
app.use("/Product", productRoute)
app.use("/Category", categoryRoute)
app.use("/auth", authRoutes)



app.listen(4000,()=>{
    console.log("Serverr Running...");
    
})

