const mongoose = require('mongoose');

const connectDataBase = () => {
    mongoose.connect(process.env.DB_URI, {
    // mongoose.connect('mongodb://localhost:27017', {
        useNewUrlParser: true, useUnifiedTopology: true,
        // useCreateIndex: true
    }).then((data) => {
        console.log(`mongodb connected with server ${data.connection.host}`);
    })
    .catch((err) => {   
        console.log(err.message);
    })

}

module.exports=connectDataBase;
