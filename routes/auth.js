var express = require("express");
var authRouter = express.Router();
const User = require("./../models/UserModel");

// BCRYPT
const bcrypt = require("bcrypt");
const saltRounds = 10;

// POST   /signup
authRouter.post("/", (req, res) => {
  const { email, password } = req.body;
  if (email === "" || password === "") {
    res.render("sign-up", {
      errorMessage: "Username and Password are required"
    });
    return;
  }
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPw = bcrypt.hashSync(password, salt);
  User.create({email, password: hashedPw})
  .then(createdUser => {
    res.redirect("/login")
  })
  .catch(err => {
    console.log(err)
    if(err.code === 11000) {
      res.render("sign-up", {
        errorMessage: `E-mail already exists. Please <a href="/log-in">login</a>`
    })
  } else {
    res.render("sign-up", {
      errorMessage: `Some error occured`
  }
  )};
  });
});

//  GET    /signup
authRouter.get("/", (req, res) => {
  res.render("sign-up");
});

module.exports = authRouter;
