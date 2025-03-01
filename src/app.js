const express = require("express");
const app = express();
const { connectDB } = require("./config/database");
const UserModel = require("./models/user");

app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "Virat",
    lastName: "kohli",
    emailId: "v@gmail.com",
    password: "Qwerty@123",
    age: 36,
    gender: "Male",
  };

  //Creating a new instance of the UserModel
  const user = new UserModel(userObj);

  try {
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error saving the user", err.message);
  }
});

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
