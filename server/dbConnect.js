const mongoose = require("mongoose");

const dbConnect = () => {
    // const connectionParams = { useNewUrlParse: true};
    mongoose.connect(process.env.DB);

    mongoose.connection.on("connected", () =>{
        console.log("Connected to MongoDB");
    })
    mongoose.connection.on("error", (err) => {
        console.log("Error connecting to MongoDB: ", err);
    })
    mongoose.connection.on("disconnected", () => {
        console.log("Disconnected from MongoDB");
    })
};

module.exports = dbConnect;