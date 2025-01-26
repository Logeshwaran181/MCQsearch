require("dotenv").config();
const express = require('express');
const dbConnect = require("./dbConnect.js");
const movieRoutes = require("./routes/questions.js");
const cors = require("cors");
const app = express();

dbConnect();

app.use(express.json());
app.use(cors());

app.use("/api", movieRoutes);

const port = process.env.PORT||8080;
app.listen(port, () => console.log(`Listening on post ${port}...`));
