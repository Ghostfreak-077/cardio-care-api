const app = require('./app');

const connectDataBase = require("./config/database");

//connecting to database
connectDataBase();


//config
if(process.env.NODE_ENV!=="PRODUCTION"){
    require("dotenv").config({ path: "./config/.env" });
}

const server = app.listen(process.env.PORT, () => {
    console.log(`server is working on port ${process.env.PORT}`)
})