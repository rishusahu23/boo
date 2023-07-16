const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PostSchema = new Schema({
  user: {
    type: String,
  },
  text: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  likes: [
    {
      user: {
        type: String,
      },
    },
  ],
  comments: [
    {
      user: {
        type: String,
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Post = mongoose.model("post", PostSchema);
