import express,{Request,Response} from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from './routes/MyUserRoute'
import morgan from 'morgan'
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(()=>console.log("connected to dataBase"))

const app = express();

app.use(express.json());

app.use(morgan('tiny'))
app.use(cors());
app.use('/api/my/user', myUserRoute)

app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "Health OK! i am running on backend server" });
});

app.listen(process.env.PORT, ()=>{
    console.log(`server started at localhost :${process.env.PORT}`)
})