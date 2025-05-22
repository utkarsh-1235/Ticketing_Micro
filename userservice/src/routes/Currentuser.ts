import express  from "express";
import jwt from 'jsonwebtoken';
import { currentUser } from "../middlewares/currentUser";
import { requireAuth } from "../middlewares/require-auth";

const Router = express.Router();

Router.get('api/users/currentuser', currentUser, requireAuth,(req, res)=>{
  res.send({currentUser: req.currentUser});
  
})

export {Router as CurrentUserRouter};