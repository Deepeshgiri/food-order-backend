import Stripe from "stripe";
import { Request,Response } from "express";
const STRIPE = new Stripe(process.env.STRIPE_API_KEY as string)
const FRONTEND_URL = process.env.FRONTEND_URL as string




const createCheckOutSession = async(req:Request , res:Response)=>{

    try {

        
    } catch (error:any) {
        console.log(error)
        res.status(500).json({message:error.raw.message})
        
    }
}

export default {createCheckOutSession}