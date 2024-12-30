import e from 'express';
import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs'; 
import {errorHandler} from '../utils/error.js';

export const signup= async (req, res,next) => {
  const {username, email, password} = req.body;  //req body is in json format containing key value pairs of username, email and password

  if(!username || !email || !password || username ==' ' || email == ' ' || password == ' '){
    // return res.status(400).json({message: "All fields are required"});
    next(errorHandler(400,"All fields are required")); //to pass the error to the global error handling middleware
  }
  const hashedPassword =  bcryptjs.hashSync(password, 10);

  const newUser= new User({
    username,
     email, 
     password : hashedPassword,
    });
  
try {
  await newUser.save(); //await used to wait for Promise returned by save() to resolve before continuing with  next line of code(only used with async function)
  res.json({message: "Signup successful"});
}catch(error){
  //return res.status(400).json({message: error.message});
  next(error); //to pass the error to the global error handling middleware
}
};
  