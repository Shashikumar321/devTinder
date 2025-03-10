const express = require("express");
const app = express();
const cors = require("cors");
const { connectDB } = require("./config/database");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRouter");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

require("dotenv").config();

app.use(cors({
  origin : "http://localhost:5173",
  credentials: true
}));


app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);


//Connecting to the database
connectDB()
  .then(() => {
    console.log("Database connection successfull");
    app.listen(7777, () => {
      console.log("Server is running");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected");
  });
