require("express-async-errors");
require("dotenv").config();
const express = require("express");
const NotFoundMiddleware = require("./middleware/NotFoundMiddleware")
const ErrorHandlerMiddleware = require("./middleware/ErrorHandlerMiddleware")
const connectDB = require("./db/connect");

//express app
const app = express();
//routes
const AuthRoute = require("./routes/auth")
const JobsRoute = require("./routes/jobs")
//middleware
app.use(express.json());
app.use("/api/v1/auth", AuthRoute)
app.use("/api/v1/jobs",JobsRoute)

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
