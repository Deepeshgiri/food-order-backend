import { body, validationResult } from "express-validator";
import { NextFunction,Request,Response } from 'express';

const handleVAlidationErrors = async (req:Request, res:Response, next:NextFunction)=>{
const errors = validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
}
next()
}
export const validateMyUserRequest = [
  body("name").isString().notEmpty().withMessage("Name must be a string"),
  body("addressLine1")
    .isString()
    .notEmpty()
    .withMessage("addressLine1 must be a string"),
  body("city").isString().notEmpty().withMessage("City must be a string"),
  body("country").isString().notEmpty().withMessage("Country must be a string"),
  body("pincode").isString().notEmpty().withMessage("Pincode must be a string"),
  handleVAlidationErrors,
];
