var express = require('express');
var router = express.Router();
const loginRouter = require("./login");
var authRouter = require('./auth')
var listingRouter = require("./myboats")
var detailRouter = require("./detail")
var bookingsRouter = require("./bookings")
var moment = require('moment');
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
moment().format();

//Model paths
const Listing = require("./../models/ListingModel");
const User = require("./../models/UserModel");

//Set up routers here
router.use(["/myboats"], listingRouter);
router.use("/detail", detailRouter);
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

//Get homepage with all listings that are available for a given date
router.get('/', (req, res, next) => {
  // checker if user is logged in to display correct navbar
  let user = false;
  let userId = "";
  let userListings = [];

  if (req.session.currentUser) {
    userId = req.session.currentUser._id
    User.findById(userId)
      .then((foundUser) => {
        user = foundUser
        userListings = user.listings
        indexListing();
      })
      .catch((err) => console.log(err));
  } else indexListing();

  function indexListing() {
    let {
      type,
      bookingStart
    } = req.query;
    // sets default booking date to tomorrow if not given via query
    if (!bookingStart) {
      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      bookingStart = tomorrow
    }
    // lists all listings according to filter selection
    if (type) {
      Listing.find({
          $and: [{
            type
          }, {
            _id: {
              $nin: userListings
            }
          }, {
            notAvailableDates: {
              $nin: [bookingStart]
            }
          }]
        })
        .then((data) => {
          res.render('index', {
            data,
            user
          });
        })
        .catch((err) => console.log(err));
    } else {
      Listing.find({
        $and: [{
          _id: {
            $nin: userListings
          }
        }, {
          notAvailableDates: {
            $nin: [bookingStart]
          }
        }]
      }) // lists all available listings without type filter
        .then((data) => {

          res.render('index', {
            data,
            user
          })
        })
        .catch((err) => console.log(err));
    }
  }

});

module.exports = router;