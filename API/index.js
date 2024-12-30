import express from 'express';
import mongoose from 'mongoose';
//to use 'import' not 'require' --> change the type in package.json to "module"
import dotenv from 'dotenv'

import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

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
app.use(express.json()); //to allow the app to use json data in the body of the request 

app.listen(3000,()=>{
    console.log('Server is running on port 3000!!');
})

app.use('/api/user',userRoutes);   //to use the get request from user.route.js
 

app.use('/api/auth',authRoutes);  //to use the get request from auth.route.js