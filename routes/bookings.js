var express = require('express');
var router = express.Router();
var Booking = require("../models/BookingModel");
var User = require("../models/UserModel");
var Listing = require("../models/ListingModel");




// POST to update a Booking


// POST from index to place a booking request
router.get("/request/:id", (req, res) => {
    listingID = req.query.id
    borrowerID = req.session.currentUser._id
    User.findOne({listing: listingID})
    .then( (result) => {
        Bookings.create({
            ownerId: result._id,
            borrowerID: borrowerID,
            listingID: listingID,
            // bookingStart:
            status: "pending"
        })
        .then((result) => {
            console.log("booking created: ", result)
            res.redirect("/bookings")
            // or render the page here with a success message
        }).catch((err) => {
            console.log(err)
        });
    })
    .catch( (err) => console.log(err));
})

//GET bookings overview with where current user is Borrower
router.get("/", (req, res) => {
    Booking.find({borrowerId: eq.session.currentUser._id})
        .then( (data) => {
            res.render("../views/bookings.hbs", {data});
        })
        .catch( (err) => console.log(err));
})

// GET listensto /listing/ID and show detail


// GET listens to /myboats and shows overview
router.get("/", (req, res) => {
  Listing.find() // filter for "current user ID"
    // find me all listing ID in the "listings Array" of the current user
    //find many for these IDs in the boat collection
    .then((result) => res.render("../views/myboats.hbs", {
      result: result
    }))
    .catch((err) => console.log(err));
})

module.exports = router;