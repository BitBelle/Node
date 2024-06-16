import express,{json} from 'express'
import router from './Routes/productRoutes'
import productRoute from './Routes/productRoutes'
import categoryRoute from './Routes/categoryRoute'
// import router from './Routes'
import cron from 'node-cron'
import {run} from './EmailService'
import authRoutes from './Routes/authRoutes';

const app= express()


cron.schedule('*/10 * * * *', async () => {
    await run();
});



// middleware
app.use(json())

// // routes
app.use("/Product", productRoute)
app.use("/Category", categoryRoute)
app.use("/auth", authRoutes)



app.listen(4000,()=>{
    console.log("Serverr Running...");
    
})

