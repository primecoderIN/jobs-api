require("express-async-errors");
require("dotenv").config();
const NotFoundMiddleware = require("./middleware/NotFoundMiddleware")
const ErrorHandlerMiddleware = require("./middleware/ErrorHandlerMiddleware")

const connectDB = require("./db/connect");

const express = require("express");
const { append } = require("express/lib/response");

//express app
const app = express();

//middleware
app.use(express.json());

app.get("/", (req,res)=> {
    res.send("Hello")
})

app.use(ErrorHandlerMiddleware)
app.use(NotFoundMiddleware)

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
