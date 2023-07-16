const express = require("express");
const router = express.Router();

const User = require("../model/user");

router.post("/register", async (req, res) => {
  const user = await User.findOne({ name: req.body.name });
  if (user) {
    return res.status(400).json({ email: "account already exists" });
  } else {
    const newUser = await User.create({
      name: req.body.name,
    });
    res.status(200).json({ user: newUser });
  }
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json({
    user,
  });
});

module.exports = router;
