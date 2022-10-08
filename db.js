// getting-started.js
// Configuration for dotenv pkg and file
require("dotenv").config();
const { DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env; // Object Destructuring

const DB_URL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.rhra5x8.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(DB_URL);

  console.log({ DB_USERNAME, DB_PASSWORD, DB_NAME, DB_URL });
  console.log("Mongodb connected ...");

  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}

// mongodb+srv://<username>:<password>@cluster0.rhra5x8.mongodb.net/<database_name>?retryWrites=true&w=majority
