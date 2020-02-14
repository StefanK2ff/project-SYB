var express = require('express');
var router = express.Router();
var authRouter = require('./auth')

//Model paths
const Listing = require("./../models/ListingModel");

//Set up routers here
const loginRouter = require("./auth");

router.use(["/log-in", "/login"], authRouter);
router.use(["/sign-up", "/signup"], loginRouter);

//Get homepage with all listings 
router.get('/', function(req, res, next) {
  Listing.find() // Method to render all listings available
    .then( (data) => {
      res.render('index', {data});
    })
    .catch( (err) => console.log(err));
});

router.get("/bookings", isLoggedIn, (req, res, next) => {
   res.render("bookings");
})

function isLoggedIn(req, res, next) {
  if (req.session.currentUser) next();
  else res.redirect("/login");
}

module.exports = router;
