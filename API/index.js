import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
//to use 'import' not 'require' --> change the type in package.json to "module"
import dotenv from 'dotenv'

import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';

dotenv.config()

//connect mongoose to the database
mongoose
  .connect(process.env.MONGO)
  .then(()=>{
  console.log('MongoDB is connected')
})
.catch((err)=>{
  console.log(err)
})

const app=express();
app.use(express.json()); //to allow the app to use json data in the body of the request (Parses JSON bodies in requests)
app.use(cookieParser()); //to allow the app to use cookies in the request (extract cookies from browser)
app.listen(3000,()=>{
    console.log('Server is running on port 3000!!');
})
app.use('/api/user',userRoutes);   //to use the get request from user.route.js
app.use('/api/auth',authRoutes);  //to use the get request from auth.route.js
app.use('/api/post',postRoutes);  //to use the get request from post.route.js
//error handling global middleware
app.use((err,req,res,next)=>{ 
  const statusCode=err.statusCode || 500;
  const message=err.message || "Internal server error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message: message
  })
});