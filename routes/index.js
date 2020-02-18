var express = require('express');
var router = express.Router();
const loginRouter = require("./login");
var authRouter = require('./auth')
var listingRouter = require("./myboats")
var bookingsRouter = require("./bookings")

//Model paths
const Listing = require("./../models/ListingModel");

//Set up routers here
router.use(["/myboats"], listingRouter);
router.use(["/sign-up", "/signup"], authRouter);
router.use(["/log-in", "/login"], loginRouter);
router.use("/bookings", bookingsRouter);

//Log out
router.get("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) {
      // If unable to logout the user
      res.redirect("/");
    } else {
      res.redirect("/log-in");
    }
  });
});

//Get homepage with all listings 
router.get('/', (req, res, next) => {
  let {type, bookingStart} = req.query;
  let user = false; // 
  if(req.session.currentUser){ // checker if user is logged in to display correct navbar
    user = req.session.currentUser //
  }
 
  if(bookingStart || type){ // lists all listings according to filter selection
    Listing.find({notAvailableDates: {$nin: [bookingStart]}})//{type}
    .then( (data) => {
      res.render('index', {data, user}); 
    })
    .catch( (err) => console.log(err));
  } 
  else {
    Listing.find() // lists all available listings without filter
    .then( (data) => {
      res.render('index', {data, user})  
    })
    .catch( (err) => console.log(err));
  }
});

module.exports = router;