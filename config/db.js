const mongoose = require("mongoose");
const mongoUri = require("./keys").MONGOURI;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error.message);
    //exit Procces With Failure
    process.exit(1);
  }
};

module.exports = connectDB;
