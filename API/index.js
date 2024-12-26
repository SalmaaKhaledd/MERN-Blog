import express from 'express';
//to use 'import' not 'require' --> change the type in package.json to "module"
const app=express();

app.listen(3000,()=>{
    console.log('Server is running on port 3000!!');
})