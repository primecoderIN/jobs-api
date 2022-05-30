require("express-async-errors");
require("dotenv").config();

const connectDB = require("./db/connect");

const express = require("express");
const { append } = require("express/lib/response");

//express app
const app = express();

//middleware

app.use(express.json());

//server

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
