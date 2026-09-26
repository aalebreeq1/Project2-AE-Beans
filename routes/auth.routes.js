const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const bcrypt = require("bcrypt");

router.get("/sign-up", (req, res) => {
  res.render("auth/sign-up.ejs");
});

router.post("/sign-up", async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) {
      return res.render("auth/sign-up.ejs", {
        errorMessage: "Username already taken.",
      });
    }

    if (req.body.password !== req.body.confirmPassword) {
      return res.render("auth/sign-up.ejs", {
        errorMessage: "Password and Confirm Password must match.",
      });
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    await User.create({
      username: req.body.username,
      password: hashedPassword,
      address: req.body.address || "Not provided",
      role: req.body.role || "user",
    });

    res.redirect("/auth/sign-in");
  } catch (err) {
    console.error(err);
    res.render("auth/sign-up.ejs", {
      errorMessage: "Something went wrong during sign up.",
    });
  }
});

// Sign in routes
router.get("/sign-in", (req, res) => {
  res.render("auth/sign-in.ejs");
});

router.post("/sign-in", async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (!userInDatabase) {
      return res.render("auth/sign-in.ejs", {
        errorMessage: "Invalid username or password.",
      });
    }

    const validPassword = bcrypt.compareSync(
      req.body.password,
      userInDatabase.password,
    );

    if (!validPassword) {
      return res.render("auth/sign-in.ejs", {
        errorMessage: "Invalid username or password.",
      });
    }

    req.session.user = {
      username: userInDatabase.username,
      _id: userInDatabase._id,
      role: userInDatabase.role,
    };

    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.render("auth/sign-in.ejs", {
      errorMessage: "An error occurred during sign in.",
    });
  }
});

router.get("/sign-out", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;
