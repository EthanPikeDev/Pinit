const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middlewares/auth");
const Post = require("../models/Post");
const User = require("../models/User");
const Profile = require("../models/Profile");

router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(5000).send("Server Error");
  }
});

router.post(
  "/",
  [auth, check("image", "image is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    try {
      const user = await User.findById(req.user.id).select("-password");
      const profile = await Profile.findOne({ user: req.user.id });
      const { image } = req.body;
      const newPost = new Post({
        user: req.user.id,
        name: user.name,
        profilePic: profile.profilePic,
        image,
      });
      const post = await newPost.save();
      res.json(post);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  }
);

router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post)
      return res.status(400).json({ msg: "Sorry There No Post Found" });
    res.json(post);
  } catch (error) {
    console.error(error);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post Not Found" });
    }
    res.status(500).send("Server Error");
  }
});
//get by user id
router.get("/user/:user_id", auth, async (req, res) => {
  try {
    const post = await Post.find({ user: req.params.user_id }).sort({
      createdAt: -1,
    });
    if (!post)
      return res.status(400).json({ msg: "Sorry There No Post Found" });
    res.json(post);
  } catch (error) {
    console.error(error);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post Not Found" });
    }
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post Not Found" });
    }
    if (req.user.id !== post.user.toString()) {
      return res.status(401).json({ msg: "unAuthorization" });
    }
    await post.remove();
    res.json({ msg: "Post Deleted" });
  } catch (error) {
    console.error(error);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post Not Found" });
    }
    res.status(500).send("Server Error");
  }
});

// Likes
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).json({ msg: "There is no post found" });
    }
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      const removeIndex = post.likes
        .map((like) => like.user.toString())
        .indexOf(req.user.id);
      post.likes.splice(removeIndex, 1);
      await post.save();
      return res.json(post.likes);
    } else {
      post.likes.unshift({ user: req.user.id });
      await post.save();
      return res.json(post.likes);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Errors");
  }
});

router.post(
  "/comment/:id",
  [auth, check("text", "Text is Require").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return req.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id);
      const profile = await Profile.findOne({ user: req.user.id });
      const post = await Post.findById(req.params.id);
      const newComment = {
        text: req.body.text,
        name: user.name,
        profilePic: profile.profilePic,
        user: req.user.id,
      };
      post.comments.push(newComment);
      await post.save();
      res.json(post.comments);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    if (!comment) return res.status(404).json({ msg: "No comment found" });
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "user not Authorized" });
    }
    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);
    post.comments.splice(removeIndex, 1);
    await post.save();
    res.json(post.comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
