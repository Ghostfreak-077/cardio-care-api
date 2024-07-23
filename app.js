const express = require('express');
const cookieparser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors')

// Enable CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
})

//config
if(process.env.NODE_ENV!=="PRODUCTION"){
    require("dotenv").config({ path: "./config/.env" });
}

// app.use(cors())
app.use(cookieparser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({ extended: false }))

const user = require("./routes/userRoute.js");

app.use("/api/", user);
app.get('/test', (req,res)=>{
    res.send("CardioCare is running");
})

module.exports = app;