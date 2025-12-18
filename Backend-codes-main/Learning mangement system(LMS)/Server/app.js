import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { config } from 'dotenv';
import errorMiddleware from './middlewares/error-midlle.js'
import CourseRoutes from './Routes/course-routes.js'
import PaymentRoutes from './Routes/Payment-routes.js'
import UserRoutes from './Routes/user-routes.js'

config();

const app = express()



app.use(express.json())

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,

}))

app.use(cookieParser())
app.use(morgan('dev'))
app.use(express.urlencoded({extended:true}));

app.use("/ping",function(req,res){
    res.send("pong")
})

app.use('/api/v1/User', UserRoutes)
app.use('api/v1/courses',CourseRoutes)
app.use('api/v1/payments',PaymentRoutes)

// routes of 3 modules
app.all("*",(req,res) =>{
    res.status(404).send("Route not found")
})

app.use(errorMiddleware)


export default app