const express = require("express");
const {sequelize,DataTypes} = require("./config/db");
const {movieRoute}= require("./routes/movies.route")
require("dotenv").config


const app = express();
app.use(express.json());

sequelize.authenticate()
.then(()=> console.log('connection successfull'))
.catch((err)=> console.log("Failed to connect",process.env.Username));

app.use("/",movieRoute)

app.listen(process.env.Port,()=>{
   console.log("Server Started At SQL",process.env.Port);
})