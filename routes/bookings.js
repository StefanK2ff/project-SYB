var express = require('express');
var router = express.Router();
var Bookings = require("../models/BookingModel");
var User = require("../models/UserModel");
var Listing = require("../models/ListingModel");




// POST to update a Booking


// POST from index to place a booking request
router.post("/request/:id", (req, res) => {
    listingID = req.params.id
    borrowerID = req.session.currentUser._id
    User.findOne({
            listings: listingID
        })
        .then((result) => {
            console.log(result)
            Bookings.create({
                    ownerId: result._id,
                    borrowerId: borrowerID,
                    listingId: listingID,
                    // bookingStart:
                    status: "pending"
                })
                .then((result) => {
                    console.log("booking created: ", result)
                    res.redirect("/bookings?status=success")
                }).catch((err) => {
                    console.log(err)
                });
        })
        .catch((err) => console.log(err));
})

// //GET bookings overview with where current user is Borrower
router.get("/", (req, res) => {
    const prom1 = Bookings.find({
            borrowerId: req.session.currentUser._id
        })
        .then((madeBookings) => { 
            return {madeBookings}
        })
        .catch((err) => console.log(err));

    const prom2 = Bookings.find({
        ownerid: req.session.currentUser._id
        })
        .then((incomingBookings) => {
            return {incomingBookings}
        })
        .catch((err) => console.log(err));

    Promise.all([prom1, prom2])
        .then((data) => {
            console.log(data)
            if (req.query.status="success") var message ="Your booking request was sent to the owner!"
            res.render("../views/bookings.hbs", {data, message} )
        })
        .catch((err) => console.log(err));
})

module.exports = router;