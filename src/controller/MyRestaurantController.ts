import { Response, Request } from "express";
import Restaurant from "../Models/Restaurant";
import cloudinary from "cloudinary";
import mongoose from "mongoose";
import { error } from "console";
// import {v2 as cloudinary} from 'cloudinary';

const getMyRestaurant = async (req: Request, res: Response) => {
  const restaurant = await Restaurant.findOne({ user: req.userId });
  if (!restaurant) {
    return res.status(404).json({ message: "Restaurant not found" });
  }
  return res.json(restaurant);
};

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

    const imageUrl = await uploadImage(req.file as Express.Multer.File);
    const restaurant = new Restaurant(req.body);
    restaurant.imageUrl = imageUrl;
    restaurant.user = new mongoose.Types.ObjectId(req.userId);
    restaurant.lastUpdated = new Date();

    await restaurant.save();

    res.status(201).send(restaurant);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "something went wrong at create restaurant", error });
  }
};

const updateMyRestaurant = async (req: Request, res: Response) => {
  const {
    restaurantName,
    address,
    city,
    country,
    cuisines,
    menuItems,
    deliveryPrice,
    estimatedDeliveryTime,
  } = req.body;
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId });
    if (!restaurant) {
      return res.status(404).json({ message: "restaurant not found" });
    }
    (restaurant.restaurantName = restaurantName),
      (restaurant.address = address),
      (restaurant.country = country),
      (restaurant.city = city),
      (restaurant.deliveryPrice = deliveryPrice),
      (restaurant.cuisines = cuisines),
      (restaurant.menuItems = menuItems),
      (restaurant.estimatedDeliveryTime = estimatedDeliveryTime),
      (restaurant.lastUpdated = new Date());
    if (req.file) {
      const imageUrl = await uploadImage(req.file as Express.Multer.File);
      restaurant.imageUrl = imageUrl;
    }
    await restaurant.save()
    res.status(200).send(restaurant)
    
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ message: "something went wrong updating restaurant!!" });
  }
};

export default {
  getMyRestaurant,
  createMyRestaurant,
  updateMyRestaurant,
};
