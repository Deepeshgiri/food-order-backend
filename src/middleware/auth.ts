import { NextFunction,Request,Response } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import jwt from 'jsonwebtoken'
import User from "../Models/User";


declare global {
  namespace Express {
    interface Request{
      userId:string;
      auth0Id:string;
    }
  }
}

export const jwtCheck = auth({
  
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    tokenSigningAlg: 'RS256'
  });

  export const jwtParse = async (req:Request, res:Response, next:NextFunction)=>{
    
const {authorization} = req.headers;
console.log(req.headers)

if(!authorization || !authorization.startsWith( "Bearer ")){
  console.log("i am issue")
  return res.json({message:"bearer issue"}).status(401);
  
}
const parts = authorization.split(" ")
const token = parts [1]
console.log(token)
console.log("did you get token")
try {
  const decoded = jwt.decode(token) as jwt.JwtPayload;
  const auth0Id = decoded.sub;
  const user = await User.findOne({auth0Id});

  if(!user){
    return res.json({message:"decode issue"}).status(401);
  }

  req.auth0Id = auth0Id as string;
  req.userId = user._id.toString();
next();

} catch (error) {
  return res.json({message:"catch issue"}).status(401)
}

  }