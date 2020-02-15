var express = require('express');
var router = express.Router();
var Listing = require("../models/ListingModel");
var User = require("../models/UserModel");

//GET to edit a listing


//POST to update a listing


// POST to delete listing


// POST from new boat add Form
router.post("/add", (req, res) => {
  let {
    name,
    type,
    street,
    streetNumber,
    city,
    imageURL,
    province,
    description,
    forMaxNumOfUsers,
    notAvailableDates,
    brand //things from the form
  } = req.body; //deconstructing the object right away
  if (notAvailableDates.length > 0) {
    notAvailableDates = notAvailableDates.split(",")
  }
  console.log(city)
  console.log(province)
  Listing.create({
      name,
      type,
      locationAddress: {
        street,
        streetNumber,
        city,
        province,
      },
      imageURL,
      description,
      forMaxNumOfUsers,
      notAvailableDates,
      brand
    }) //passing it over the model --> returns a promise
    .then((listing) => {
      return User.updateOne({
          _id: req.session.currentUser._id
        }, {
          $addToSet: {
            listings: listing._id
          }
        })
        .then((User) => {
          console.log("User updated! ", User)
          console.log("new listing ", listing)
          res.redirect("/myboats")
        })
        .catch((err) => console.log("Err while updating the user! ", err));

    })
    .catch((err) => {
      console.log(err)
      if (err.code === 11000) {
        res.render("../views/addboat.hbs",{
          errorMessage: `Boats are unique. This name is already taken. Try a new one!`
        })
      } else {
        res.render("../views/addboat.hbs", {
          errorMessage: `Some error occured`
        });
      }
    })
})

//GET add form
router.get("/add", (req, res) => {
  res.render("../views/addboat.hbs")
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