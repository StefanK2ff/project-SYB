var express = require('express');
var router = express.Router();
const loginRouter = require("./login");
var authRouter = require('./auth')
var listingRouter = require("./myboats")

//Model paths
const Listing = require("./../models/ListingModel");

//Set up routers here

router.use(["/myboats"], listingRouter);
router.use(["/sign-up", "/signup"], authRouter);
router.use(["/log-in", "/login"], loginRouter);



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
