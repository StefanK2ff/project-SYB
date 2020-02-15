var express = require('express');
var router = express.Router();
const loginRouter = require("./login");
var authRouter = require('./auth')
var listingRouter = require("./myboats")

//Model paths
const Listing = require("./../models/ListingModel");

//Set up routers here

router.use(["/sign-up", "/signup"], authRouter);
router.use(["/log-in", "/login"], loginRouter);
router.use(["/myboats"], listingRouter);

//Get homepage with all listings 
router.get('/', function(req, res, next) {
  const {type} = req.query;

  if(type){ // lists all listings according to filter selection
    Listing.find({type})
    .then( (data) => {
      res.render('index', {data});
    })
    .catch( (err) => console.log(err));
  } 
  else {
    Listing.find() // lists all available listings without filter
    .then( (data) => {
      res.render('index', {data})
    })
    .catch( (err) => console.log(err));
  }
  });

//helper function to check if user is logged in
// function isLoggedIn(req, res, next) {
//   if (req.session.currentUser) next();
//   else res.redirect("/login");
// }

// router.post - create booking, with listing info, user info, and redirect to booking page https://trello.com/c/65IG1jrO/37-post-route-booking-request


module.exports = router;
