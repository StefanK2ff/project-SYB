var express = require('express');
var router = express.Router();

//Model paths
const Listing = require("./../models/ListingModel");

//Set up routers here
const loginRouter = require("./auth");
router.use("/log-in", loginRouter);

//Get homepage with all listings 
router.get('/', function(req, res, next) {

  Listing.find() // Method to render all listings available
    .then( (data) => {
      console.log('data found');
      res.render('index', {data});
    })
    .catch( (err) => console.log(err));
});


//Helper function to check if user is logged in
function isLoggedIn(req, res, next) {
  if (req.session.currentUser) next();
  else res.render('index');
}

module.exports = router;
