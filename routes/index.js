var express = require('express');
var router = express.Router();

//Model paths
const Listing = require("./../models/ListingModel");

//Set up routers here

//Get homepage with all listings 
router.get('/', function(req, res, next) {
  res.render('index')
});

  // Listing.find()
  //   .then( (data) => {
  //     res.render('index', {data});
  //   })
  //   .catch( (err) => console.log(err));



module.exports = router;
