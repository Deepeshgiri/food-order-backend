import express,{Request,Response} from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from './routes/MyUserRoute'
import morgan from 'morgan'
import {v2 as cloudinary} from 'cloudinary';
import MyRestaurant from "./routes/MyRestaurant"


mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(()=>console.log("connected to dataBase"))


          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});


const app = express();

app.use(express.json());

app.use(morgan('tiny'))
app.use(cors());

//route after base address
app.use('/api/my/user', myUserRoute)
app.use('/api/my/restaurant', MyRestaurant)

app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "Health OK! i am running on backend server" });
});

app.listen(process.env.PORT, ()=>{
    console.log(`server started at localhost :${process.env.PORT}`)
})