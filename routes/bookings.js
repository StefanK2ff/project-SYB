var express = require('express');
var router = express.Router();
var Bookings = require("../models/BookingModel");
var User = require("../models/UserModel");
var Listing = require("../models/ListingModel");

// POST to update a Booking
router.post("/:id", (req,res) => {
    const bookingId = req.params.id
    const {action} = req.body;
    if (action === "Decline") {
        Bookings.findByIdAndUpdate({_id: bookingId},{status: "declined"})
        .then( (data) => res.redirect("/bookings?msg=declined"))
        .catch( (err) => console.log(err));
    }
    if (action === "Accept") {
        Bookings.findByIdAndUpdate({_id: bookingId},{status: "accepted"})
        .then( (data) => res.redirect("/bookings?msg=accepted"))
        .catch( (err) => console.log(err));
    }
});

// POST from index to place a booking request
router.post("/request/:id", (req, res) => {
    if(req.session.currentUser){ // checker to see if user logged in. If not, redirects to log-in page
        listingID = req.params.id
        let {bookingStart} = req.body;
        let bookingStartTurn = bookingStart.split("-")
        bookingStart = `${bookingStartTurn[2]}/${bookingStartTurn[1]}/${bookingStartTurn[0]}`
        borrowerID = req.session.currentUser._id;
        User.findOne({
                listings: listingID
            })
            .then((result) => {
                //console.log(result)
                Bookings.create({
                    ownerId: result._id,
                    borrowerId: borrowerID,
                    listingId: listingID,
                    bookingStart: bookingStart,
                    status: "pending"
                    })
                    .then((result) => {
                        // console.log("booking created: ", result)
                        res.redirect("/bookings?msg=success")
                     }).catch((err) => {
                     console.log(err)
                    });
                })
            .catch((err) => console.log(err));
    }
    else {
        res.render("log-in");
    }
});

// //GET bookings overview with where current user is Borrower
router.get("/", (req, res) => {
    let user = false; // 
    if(req.session.currentUser){ // checker if user is logged in to display correct navbar
        user = req.session.currentUser //
    }

    const prom1 = Bookings.find({
            borrowerId: req.session.currentUser._id
        })
        .then((madeBookings) => { 
            return {madeBookings}
        })
        .catch((err) => console.log(err));

    const prom2 = Bookings.find({
            ownerId: req.session.currentUser._id,
            status: "pending"
        })
        .then((incomingBookings) => {
            return {incomingBookings}
        })
        .catch((err) => console.log(err));

    Promise.all([prom1, prom2])
        .then((data) => {
            let messageHandler = req.query.msg
            switch (messageHandler) {
                case "success":
                    message = "Your booking request was sent to the owner!";
                    break;
                case "accepted":
                    message = "The booking was accepted and the answer was sent to the Requester";
                    break;
                case "declined":
                    message = "The request was declined and the answer was sent!";
                    break;
                default:
                    message = null;
            }
            res.render("../views/bookings.hbs", {data, message, user});
        })
        .catch((err) => console.log(err));
})

module.exports = router;