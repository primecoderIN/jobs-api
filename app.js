require("express-async-errors");
require("dotenv").config();
const express = require("express");
const NotFoundMiddleware = require("./middleware/NotFoundMiddleware");
const ErrorHandlerMiddleware = require("./middleware/ErrorHandlerMiddleware");
const VerifyUser = require("./middleware/VerifyUser");
const VerifyAdmin = require("./middleware/VerifyAdmin");
const connectDB = require("./db/connect");
//Extra security packages 
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean")
const rateLimiter = require("express-rate-limit")

//express app

const app = express();

app.set("trust proxy",1)
app.use(rateLimiter( {
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
}))
app.use(helmet())
app.use(cors())
app.use(xss())

//routes
const AuthRoute = require("./routes/auth");
const JobsRoute = require("./routes/jobs");


//middleware
app.use(express.json());
app.use("/api/v1/auth", AuthRoute);
app.use("/api/v1/jobs", VerifyUser, JobsRoute);


app.use(ErrorHandlerMiddleware);
app.use(NotFoundMiddleware);

//server
const port = process.env.PORT || 3000;
const URI = process.env.MONGO_URI;
const start = async () => {
  try {
    await connectDB(URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
