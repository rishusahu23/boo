"use strict";

const express = require("express");
const profile = require("../model/profile");
const router = express.Router();

const profiles = [
  {
    id: 1,
    name: "A Martinez",
    description: "Adolph Larrue Martinez.",
    mbti: "ISFJ",
    enneagram: "9w3",
    variant: "sp/so",
    tritype: 725,
    socionics: "SEE",
    sloan: "RCOEN",
    psyche: "FEVL",
    image: "https://soulverse.boo.world/images/1.png",
  },
];

const getAllProfiles = async (req, res) => {
  const profiles = await profile.find({});
  console.log(profiles);
  res.render("profile_template", {
    profile: profiles[0],
  });
};

const getProfile = async (req, res) => {
  const newProfile = await profile.findById(req.params.id);
  console.log(profiles);
  res.render("profile_template", {
    profile: newProfile,
  });
};

const saveProfile = async (req, res) => {
  console.log(req.body);
  const newProfile = await profile.create(req.body);
  res.status(200).json({ message: "success", data: { profile: newProfile } });
};

router.route("/").get(getAllProfiles);
router.route("/:id").get(getProfile);
router.route("/profile").post(saveProfile);
module.exports = router;
