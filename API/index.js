import express from 'express';
import mongoose from 'mongoose';
//to use 'import' not 'require' --> change the type in package.json to "module"
import dotenv from 'dotenv'

dotenv.config()
mongoose
  .connect(process.env.MONGO)
  .then(()=>{
  console.log('MongoDB is connected')
})
.catch((err)=>{
  console.log(err)
})

const app=express();

app.listen(3000,()=>{
    console.log('Server is running on port 3000!!');
})