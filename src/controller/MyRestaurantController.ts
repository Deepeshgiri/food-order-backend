import { Response, Request } from "express";
import Restaurant from "../Models/Restaurant";
import cloudinary from "cloudinary";
import mongoose from "mongoose";
import { error } from "console";
// import {v2 as cloudinary} from 'cloudinary';


const uploadImage = async (file: Express.Multer.File) => {
    const image = file;
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;
  
    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
    
    return uploadResponse.url;
  };


const createMyRestaurant = async (req: Request, res: Response) => {
  try {
    const existingRestaurant = await Restaurant.findOne({ user: req.userId });
    if (existingRestaurant) {
      return res
        .status(409)
        .json({ message: "user restaurant already exists" });
    }
    // return res.send(req.file)
    // const image = req.file as Express.Multer.File
    // const base64Image = Buffer.from(image.buffer).toString("base64");
    // const dataURI = `data:${image.mimetype}; base64,${base64Image}`;
    // const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);

    const imageUrl = await uploadImage(req.file as Express.Multer.File);
    const restaurant =  new Restaurant(req.body);
    restaurant.imageUrl =  imageUrl;
    restaurant.user = new mongoose.Types.ObjectId(req.userId);
    restaurant.lastUpdated = new Date();

    await restaurant.save();

    res.status(201).send(restaurant);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "something went wrong at create restaurant" , error});
  }
};

export default {
  createMyRestaurant,
};
