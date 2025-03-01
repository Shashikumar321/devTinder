const express = require("express");
const app = express();
const { connectDB } = require("./config/database");
const UserModel = require("./models/user");

app.use(express.json());

//Create a new user
app.post("/signup", async (req, res) => {
  //Creating a new instance of the UserModel
  const user = new UserModel(req.body);

  try {
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error saving the user", err.message);
  }
});

//Get all users
app.get("/feed", async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Error fetching the users");
  }
});

//Get single user details with emailId as input
app.get("/user", async (req, res) => {
  try {
    const userDetails = await UserModel.find({ emailId: req.body.emailId });

    if (userDetails.length === 0) {
      res.status(404).send("user not found");
    } else {
      res.send(userDetails);
    }
  } catch (err) {
    res.status(400).send("Error fetching user details");
  }
});

//Delete single user with emailId as input
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    await UserModel.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Error Deleting the user");
  }
});



//Post update single user
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    await UserModel.findByIdAndUpdate(userId, data);
    res.send("User updated successfully");

  } catch (err) {
    res.status(400).send("Error updating the user");
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
