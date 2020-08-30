const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const Profile = require("../models/Profile");
const User = require("../models/User");
const Post = require("../models/Post");

router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", "name");
    if (!profile) {
      return res.status(400).json({ msg: "Sorry There is no user found" });
    }
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.post("/", auth, async (req, res) => {
  const { profilePic, age, website, location, bio } = req.body;
  const profileField = {};
  profileField.user = req.user.id;
  if (profilePic) profileField.profilePic = profilePic;
  if (age) profileField.age = age;
  if (website) profileField.website = website;
  if (location) profileField.location = location;
  if (bio) profileField.bio = bio;
  try {
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileField },
        { new: true }
      );
      return res.json(profile);
    }
    profile = new Profile(profileField);
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    req.status(500).send("Server Error");
  }
});

// Get All the Profiles
router.get("/", auth, async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", "name");
    res.json(profiles);
  } catch (error) {
    console.log(error.message);

    res.status(500).send("Server Error");
  }
});
// Get User Profile
router.get("/user/:user_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", "name");
    if (!profile)
      return res.status(400).json({ msg: "There is no user found" });
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    if (error.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile Not Found" });
    }
    res.status(500).send("Server Error");
  }
});

router.delete("/", auth, async (req, res) => {
  try {
    await Post.deleteMany({ user: req.user.id });
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });
    res.json("User Deleted");
  } catch (error) {
    console.error(message.error);
    res.status(500).send("Server Error");
  }
});

router.put("/following/:id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.id });
    const userProfile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(400).json({ msg: "There is no User found" });
    }
    if (
      profile.followers.filter(
        (follow) => follow.user.toString() === req.user.id
      ).length > 0
    ) {
      const removeIndex = profile.followers
        .map((follow) => follow.user.toString())
        .indexOf(req.user.id);
      profile.followers.splice(removeIndex, 1);

      const removeIndexs = userProfile.following
        .map((follow) => follow.user.toString())
        .indexOf(req.user.id);
      userProfile.following.splice(removeIndexs, 1);
      await profile.save();
      await userProfile.save();
      return res.json(profile.followers);
    } else {
      profile.followers.unshift({ user: req.user.id });
      userProfile.following.unshift({ user: req.params.id });
      await profile.save();
      await userProfile.save();
      return res.json(profile.followers);
    }
  } catch (error) {
    console.error(message.error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
