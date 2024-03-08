import express from "express";
import { param } from "express-validator";
import RestaurantController from "../controller/RestaurantController";
const router = express.Router();

router.get(
  "/:restaurantId",
  param("restaurantId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("restaurant id must be valid"),
  RestaurantController.getRestaurant);

router.get(
  "/search/:city",
  param("city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("City Parameter must be a valid string"),
  RestaurantController.searchRestaurants
);

export default router;
