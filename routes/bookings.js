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
        return Bookings.findByIdAndUpdate({_id: bookingId},{status: "accepted"})
            .then( (updatedBooking) => {
                console.log("updatedBooking: ", updatedBooking)
                let ListingToUpdate = updatedBooking.listingId;
                let newNotAvailableDate = updatedBooking.bookingStart;
                return Listing.findByIdAndUpdate({_id: ListingToUpdate},{$addToSet: {notAvailableDates: newNotAvailableDate}})
                    .then( (updatedListing) => {
                        console.log("updatedListing: ", updatedListing)
                        res.redirect("/bookings?msg=accepted")
                    })
                    .catch( (err) => console.log(err));
            })
            .catch( (err) => console.log(err));
    }
});

// POST from index to place a booking request
router.post("/request/:id", (req, res) => {
    if(req.session.currentUser){
        listingID = req.params.id
        let {bookingStart} = req.body;
        borrowerID = req.session.currentUser._id
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
    
        // find all bookings, that the user reqested to others and are pending and in the future
        const prom1 = Bookings.find({
                borrowerId: req.session.currentUser._id,
                status: "pending",
                bookingStart: {$gte: new Date()}
            })
            .then((pendingBookings) => { 
                return {pendingBookings}
            })
            .catch((err) => console.log(err));

        // find all bookings, that the user reqested, are accepted and upcoming
        const prom2 = Bookings.find({
            borrowerId: req.session.currentUser._id,
            status: "accepted",
            bookingStart: {$gte: new Date()}
            })
            .then((upcomingBookings) => { 
                return {upcomingBookings}
            })
            .catch((err) => console.log(err));

        // find all bookings, that the user reqested to others that are declined or in the past (request archive)
        const prom3 = Bookings.find({
            borrowerId: req.session.currentUser._id,
            $or: [{status: "declined"}, {bookingStart: {$lt: new Date()}}]
            })
            .then((requestArchive) => { 
                return {requestArchive}
            })
            .catch((err) => console.log(err));

        // find all the booking request , which are pending and are addressed to current user
        const prom4 = Bookings.find({
                ownerId: req.session.currentUser._id,
                status: "pending"
            })
            .then((incomingBookings) => {
                return {incomingBookings}
            })
            .catch((err) => console.log(err));

        // find all the booking request, which are accepted and are addressed to current user
        const prom5 = Bookings.find({
            ownerId: req.session.currentUser._id,
            status: "accepted"
            })
            .then((upcomingShares) => {
                return {upcomingShares}
            })
            .catch((err) => console.log(err));

        // find all the booking request, which are declined and are addressed to current user
        const prom6 = Bookings.find({
            ownerId: req.session.currentUser._id,
            status: "declined"
            })
            .then((sharerArchive) => {
                return {sharerArchive}
            })
            .catch((err) => console.log(err));


        Promise.all([prom1, prom2, prom3, prom4, prom5, prom6],)
            .then((data) => {
                // data 
                // FOR THE REQUESTER: pendingBookings, upcomingBookings, requestArchive
                // FOR THE SHARER: incomingBookings, upcomingShares, sharerArchive
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
    } else {req.redirect("sign-up")}
})

module.exports = router;