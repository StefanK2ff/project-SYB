var express = require("express");
var loginRouter = express.Router();
const User = require("./../models/UserModel");

// BCRYPT
const bcrypt = require("bcrypt");
const saltRounds = 10;

//  GET    /login
loginRouter.get("/", (req, res) => {
  if(req.session.currentUser) {
    res.redirect('/')
  }
  else {
    res.render("log-in");
  }
});

// POST /login
loginRouter.post("/", (req, res) => {
  const { password, username } = req.body;

  if (username === "" || password === "") {
    res.render("log-in", {
      errorMessage: "Username and password are required"
    });
    return;
  }

  User.findOne({ username })
    .then(foundUser => {
      if (!foundUser) {
        res.render("log-in", {
          errorMessage: "Username doesn't exist"
        });
        return;
      }

      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

      if (passwordCorrect) {
        req.session.currentUser = foundUser;
        res.redirect("/");
      } else {
        res.render("log-in", {
          errorMessage: "Password incorrect. Try again."
        });
      }
    })
    .catch(err => console.log(err));
});

module.exports = loginRouter;