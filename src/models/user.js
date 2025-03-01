const mongoose = require("mongoose");

const userSchmea = new mongoose.Schema({
    firstName: String,
    lastName: String,
    emailId: String,
    password: String,
    age: Number,
    gender: String
});

const UserModel = mongoose.model("User", userSchmea);

module.exports = UserModel;