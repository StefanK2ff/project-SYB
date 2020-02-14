var express = require('express');
var router = express.Router();
var Listing = require("../models/ListingModel");
var User = require("../models/UserModel");

//GET to edit a listing


//POST to update a listing


// POST to delete listing


// POST from new Movie Form
router.post("/add", (req, res) => {
    const {
      name,
      type,
      street,
      streetNumber,
      city,
      imageURL,
      description,
      forMaxNumOfUsers,
      brand    //things from the form
    } = req.body; //deconstructing the object right away
    Listing.create({
      name,
      type,
      locationAddress: {
        street,
        streetNumber,
        city
      },
      imageURL,
      description,
      forMaxNumOfUsers,
      brand
    }) //passing it over the model --> returns a promise
        .then((listing) => {
            return User.updateOne({_id: req.session.currentUser._id},{$addToSet: {listings: listing._id} })
            .then((User) => {
              console.log("User updated! ", User)
              console.log("new listing ", listing)
              res.redirect("/myboats")
            })
            .catch((err) => console.log("Err while updating the user! ", err));
            
        })
        .catch((err) => console.log(err));
})

//GET add form
router.get("/add", (req, res) => {
    res.render("../views/addboat.hbs")
})


// GET listensto /listing/ID and show detail


// GET listens to /myboats and shows overview
router.get("/", (req, res) => {
    Listing.find() // filter for "current user ID"
        .then((result) => res.render("../views/myboats.hbs", {
            result: result
        }))
        .catch((err) => console.log(err));
})

module.exports = router;

