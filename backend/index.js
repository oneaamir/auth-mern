const express= require("express");
const cors=require('cors');
const app= express();
const Authrouter=require('./Routers/AuthRouter');

require('dotenv').config();
require("./models/db");

app.use(express.json());
app.use(cors());
app.use('/auth',Authrouter);


// app.use("/",(req,res)=>{
//     res.send("aamir")
// })





const PORT=process.env.PORT;
app.listen(PORT,()=> {
    console.log("connection port success")
})