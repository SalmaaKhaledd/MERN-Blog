import e from 'express';
import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs'; 
import {errorHandler} from '../utils/error.js';
import jwt from 'jsonwebtoken';

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

export const signin= async (req, res,next) => {
  const{email, password} = req.body;  
  if(!email || !password || email === ' ' || password === ' '){
    next(errorHandler(400,"All fields are required"));
  }
  try{
    //check if the user exists in the database
    const validUser= await User.findOne({email});
    if(!validUser){
      return next(errorHandler(404,"User not found"));
    }
    //compare the password entered by the user with the hashed password in the database
    const validPassword= bcryptjs.compareSync(password, validUser.password);
    if(!validPassword){
      return next(errorHandler(400,"Invalid password"));
    }
    const token=jwt.sign({id: validUser._id}, process.env.JWT_SECRET);
    //seperate the password from the rest of the user data
    const {password: pass, ...rest}=validUser._doc;
    //nobody can understand what the access token is (without the jwt secret key)except the server
    res.status(200).cookie('access_token', token, {
      httpOnly: true}).json(rest);
    
  }
  
  catch(error){
    next(error);
  }


};