var express = require("express");
var loginRouter = express.Router();
const User = require("./../models/UserModel");

// BCRYPT
const bcrypt = require("bcrypt");


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
  const { password, email } = req.body;

  if (email === "" || password === "") {
    res.render("log-in", {
      errorMessage: "email and password are required"
    });
    return;
  }

  User.findOne({ email })
    .then(foundUser => {
      if (!foundUser) {
        res.render("log-in", {
          errorMessage: "email doesn't exist"
        });
        return;
      }
      if (bcrypt.compareSync(password, foundUser.password)) {
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