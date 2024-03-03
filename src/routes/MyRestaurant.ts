import express from "express";
import multer from "multer";
import MyRestaurantController from "../controller/MyRestaurantController";
import { jwtCheck, jwtParse } from "../middleware/auth";

const router = express.Router();
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5mb
  },
});

router.post(
  "/",
  upload.single("imageFile"), jwtCheck, jwtParse,
  MyRestaurantController.createMyRestaurant
);

export default router;
