const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const UserModel = require("../models/user");
const validator = require("validator");

//Create a new user
authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);

    const {
      firstName,
      lastName,
      emailId,
      password,
      age,
      gender,
      about,
      skills,
    } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    //Creating a new instance of the UserModel
    const user = new UserModel({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      age,
      gender,
      skills,
      about,
    });

    const savedUser = await user.save();

    if (savedUser) {
      const token = await user.getJWT();
      res.cookie("token", token);
      res.json({ message: "User signed up successfully", data: savedUser });
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

//user login
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    if (!validator.isEmail(emailId)) {
      throw new Error("EmailId is not valid.");
    }

    const user = await UserModel.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      const token = await user.getJWT();
      res.cookie("token", token);
      res.json({ message: "User logged in successfully", data: user });
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

//user logout
authRouter.post("/logout", async (req, res) => {
  try {
    res.cookie("token", null, { expires: new Date(Date.now()) });
    res.send("User logged out successfully");
  } catch (err) {
    res.status(400).send("ERROR : " + err);
  }
});

module.exports = authRouter;
