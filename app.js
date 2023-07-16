"use strict";

const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const profileRouter = require("./routes/profile");
const userRouter = require("./routes/users");
const postRouter = require("./routes/post");
const app = express();

// set the view engine to ejs
app.set("view engine", "ejs");
app.use(express.json());

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log("DB connection successful!"));

// routes
app.use("/", profileRouter);
app.use("/users", userRouter);
app.use("/post", postRouter);

// start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
