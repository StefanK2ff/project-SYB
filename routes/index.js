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
  const {type} = req.query;
  const user = req.session.currentUser;

  if(type){ // lists all listings according to filter selection
    Listing.find({type})
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

router.post('/:id', (req, res, next) => {  // route to bookings page including listing details
  const data = {
      listingId: req.params,
      userId: req.session.currentUser._id
    }
    res.render('bookings', data)
  });

// function isLoggedIn(req, res, next) {
//   if (req.session.currentUser) next();
//   else res.redirect("/login");
// }

module.exports = router;


