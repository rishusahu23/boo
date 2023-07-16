const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Post model
const Post = require("../model/post");
// Profile model
const Profile = require("../model/profile");

// get all post with name(user)
router.get("/:name", (req, res) => {
  Post.find({ user: req.params.name })
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(404).json({ nopostsfound: "No posts found" }));
});

// get a specific post with id
router.get("/id/:id", (req, res) => {
  console.log("GET POST");
  Post.findById(req.params.id)
    .then((post) => res.json(post))
    .catch((err) =>
      res.status(404).json({ nopostfound: "No post found with that ID" })
    );
});

router.post("/:name", async (req, res) => {
  const newPost = await Post.create({
    text: req.body.text,
    title: req.body.name,
    user: req.params.name,
  });

  res.status(200).json({ post: newPost });
});

router.delete("/:name/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      // Check for post owner
      console.log(post.user, req.params.name);
      if (post.user.toString() != req.params.user) {
        return res.status(401).json({ notauthorized: "User not authorized" });
      }
      // Delete
      post.remove().then(() => res.json({ success: true }));
    })
    .catch((err) => res.status(404).json({ postnotfound: "No post found" }));
});

router.post("/like/:name/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      // Add user id to likes array
      post.likes.unshift({ user: req.params.name });

      post.save().then((post) => res.json(post));
    })
    .catch((err) => res.status(404).json({ postnotfound: "No post found" }));
});

router.post("/unlike/:name/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      // Get remove index
      const removeIndex = post.likes
        .map((item) => item.user.toString())
        .indexOf(req.params.user);

      // Splice out of array
      post.likes.splice(removeIndex, 1);

      // Save
      post.save().then((post) => res.json(post));
    })
    .catch((err) => res.status(404).json({ postnotfound: "No post found" }));
});

router.post("/comment/:name/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      const newComment = {
        text: req.body.text,
        user: req.params.name,
        title: req.body.name,
      };

      // Add to comments array
      post.comments.unshift(newComment);

      // Save
      post.save().then((post) => res.json(post));
    })
    .catch((err) => res.status(404).json({ postnotfound: "No post found" }));
});

router.delete("/comment/:id/:comment_id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      // Get remove index
      const removeIndex = post.comments
        .map((item) => item._id.toString())
        .indexOf(req.params.comment_id);

      // Splice comment out of array
      post.comments.splice(removeIndex, 1);

      post.save().then((post) => res.json(post));
    })
    .catch((err) => res.status(404).json({ postnotfound: "No post found" }));
});

module.exports = router;
