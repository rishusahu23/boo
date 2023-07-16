const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  mbti: {
    type: String,
  },
  enneagram: {
    type: String,
  },
  variant: {
    type: String,
  },
  socionics: {
    type: String,
  },
  sloan: {
    type: String,
  },
  psyche: {
    type: String,
  },
  image: String,
  tritype: {
    type: Number,
  },
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
