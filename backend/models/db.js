const mongoose = require("mongoose");
const mongo_url = process.env.MONGO_CONN;

mongoose.connect(mongo_url, {
    connectTimeoutMS: 300000, // Connection timeout
    socketTimeoutMS: 600000   // Socket timeout
})
    .then(() => {
        console.log("Connected to MongoDB successfully");
    })
    .catch((error) => {
        console.error('Connection error with mongoose:', error);
    });
