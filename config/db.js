const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongooseURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('Connect to DB');
  } catch (error) {
    console.error('Not Connected to DB');

    // Exit
    process.exit(1);
  }
};

module.exports = connectDB;
