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
router.use(["/bookings", bookingsRouter])


//Get homepage with all listings 
router.get('/', function(req, res, next) {
  const {type} = req.query;

  if(type){
    Listing.find({type})
    .then( (data) => {
      res.render('index', {data});
    })
    .catch( (err) => console.log(err));
  } 
  else {
    Listing.find()
    .then( (data) => {
      res.render('index', {data})
    })
    .catch( (err) => console.log(err));
  }
  });

//helper function to check if user is logged in
function isLoggedIn(req, res, next) {
  if (req.session.currentUser) next();
  else res.redirect("/login");
}


module.exports = router;
