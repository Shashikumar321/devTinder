const express = require("express");
const profileRouter = express.Router();
const bcrypt = require("bcrypt");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData, validateEditPasswordData } = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("User does not exist");
    }
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid edit request");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.json({
      message: loggedInUser.firstName + " : Profile updated successfully",
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

profileRouter.patch("/profile/password/edit", userAuth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!validateEditPasswordData(req)) {
      throw new Error("Invalid edit request");
    }

    const loggedInUser = req.user;

    const isCurrentPasswordValid = await loggedInUser.validatePassword(currentPassword);

    if (!isCurrentPasswordValid) {
        throw new Error("Invalid current password");
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);
    
    loggedInUser.password = passwordHash;

    await loggedInUser.save();

    res.send("Password updated successfully")

  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = profileRouter;
