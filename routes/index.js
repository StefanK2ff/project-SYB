var express = require('express');
var router = express.Router();

//Model paths
const Listing = require("./../models/ListingModel");

//Set up routers here
const loginRouter = require("./auth");

router.use("/log-in", loginRouter);

//Get route displaying all listings
router.get('/', function(req, res, next) {
  Listing.find() // Method to render all listings available
    .then( (data) => {
      res.render('index', {data});
    })
    .catch( (err) => console.log(err));
});

// Get route directing to /bookings, if user is logged in
router.get("/bookings", isLoggedIn, (req, res, next) => {
   res.render("bookings");
});

//Get route to /log-in page 
router.get("/log-in", (req, res, next) => {
  res.render("log-in");
});

//helper function to check if user is logged in
function isLoggedIn(req, res, next) {
  if (req.session.currentUser) next();
  else res.redirect("/login");
}

module.exports = router;
