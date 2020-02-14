var express = require("express");
var signupRouter = express.Router();
var loginRouter = express.Router();



// BCRYPT
const bcrypt = require("bcrypt");
const saltRounds = 10;

//  GET    /signup
signupRouter.get("/sign-up", (req, res) => {
  res.render("sign-up");
});

// POST   /signup
signupRouter.post("/sign-up", (req, res) => {
  const { password, username } = req.body;

  if (username === "" || password === "") {
    res.render("sign-up", {
      errorMessage: "Username and password are required"
    });
    return;
  }


  User.findOne({ username })
    .then(userFound => {
      if (userFound) {
        res.render("sign-up", { errorMessage: "Username is already in use." });
        return;
      }

      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      const pr = User.create({ username, password: hashedPassword });
      return pr;
    })
    .then(createdUser => {
      req.session.currentUser = createdUser;
      res.redirect("/");
    })
    .catch(() => {
      res.render("sign-up", {
        errorMessage: "Error during sign up. Try again."
      });
    });
});


//
// LOGIN
//

//  GET    /login
loginRouter.get("/log-in", (req, res) => {
  res.render("log-in");
});

// POST /login
loginRouter.post("/log-in", (req, res) => {
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
module.exports = signupRouter;