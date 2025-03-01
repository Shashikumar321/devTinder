const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://shashiyns321:K20DGQP3sQb8AEdw@namastenode.ihurz.mongodb.net/devTinder"
  );
};


module.exports = { connectDB }

