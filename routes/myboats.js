var express = require('express');
var router = express.Router();
var Listing = require("../models/ListingModel");
var User = require("../models/UserModel");


//GET  edits a listing
//router to get user request and render view
// retreive data from listing from database
router.get("/edit/:id", (req, res) => {
  const { id } = req.params;

  let user = false; // 
  if(req.session.currentUser){ // checker if user is logged in to display correct navbar
    user = req.session.currentUser //
  }

  Listing.findById(id)
    .then(listing => {
      console.log(listing);
      
      res.render("edit-boat.hbs", { listing, user }); //=> we need an hbs view here
    })
    .catch(err => console.log(err));
});

//POST     EDIT BOAT and update

router.post('/edit', (req, res, next) => {
  const { 
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
  } = req.body;

  ListingModel.update({_id: req.query.listing_id}, 
    { $set: {
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
    }})
  .then((listing) => {
    res.redirect('/');
  })
  .catch((error) => {
    console.log(error);
  })
});

// POST deletes a listing. Then goest to myboats.hbs
router.post("/:id/delete", (req, res, next) => {
  const listingID = req.params.id;

  Listing.findByIdAndDelete(listingID)
    .then(result => {
      res.redirect("/myboats");
    })
    .catch(err => {
      next(err);
    });
});


// POST from new Movie Form //=>adds Boat
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
  let user = false; // 
  if(req.session.currentUser){ // checker if user is logged in to display correct navbar
    user = req.session.currentUser //
  }
  
  res.render("../views/addboat.hbs", {user}) 
})

// GET listensto /listing/ID and show detail


// GET listens to /myboats and shows overview
router.get("/", (req, res) => {
  
  let user = false; // 
  if(req.session.currentUser){ // checker if user is logged in to display correct navbar
    user = req.session.currentUser //
  }

  Listing.find() // filter for "current user ID"
    // find me all listing ID in the "listings Array" of the current user
    //find many for these IDs in the boat collection
    .then((result) => res.render("../views/myboats.hbs", {
      result: result, user
    }))
    .catch((err) => console.log(err));
})

module.exports = router;