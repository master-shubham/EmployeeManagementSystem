const mongoose= require("mongoose")

const DB_URL = process.env.MONGO_URL;

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch((err) => {
    console.log("Error MongoDB", err);
  });