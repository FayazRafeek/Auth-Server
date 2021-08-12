require('dotenv').config()
const mongoose = require('mongoose');

const URI = process.env.DATABASE_URL;

const connectDB = async () => {
  await mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  console.log('db connected..!');
};

module.exports = connectDB;