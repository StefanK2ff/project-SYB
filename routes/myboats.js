const express = require('express');
const router = express.Router();
const Listing = require("../models/ListingModel");
const User = require("../models/UserModel");
const parser = require('../config/cloudinary');

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
      
      res.render("edit-boat.hbs", { listing, user }); 
    })
    .catch(err => console.log(err));
});

//POST     EDIT BOAT and update

router.post('/edit/:listingId', parser.single('photo'), (req, res, next) => {
  const imageURL = req.file.secure_url; // <-- for claudinary

  let { 
    name,
    type,
    street,
    streetNumber,
    city,
    // imageURL <-- for claudinary
    province,
    description,
    forMaxNumOfUsers,
    notAvailableDates,
    brand //things from the form 
  } = req.body;
console.log('anything blablabla');

console.log(req.params.listingId);

  Listing.updateOne({_id: req.params.listingId}, 
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
    }}, {new:true})
  .then((listing) => {
    console.log(listing);
   
    
    res.redirect('/myboats');
  })
  .catch((error) => {
    console.log(error);
  })
});


// POST deletes a listing. Then goest to myboats.hbs
router.post("/delete/:id", (req, res, next) => {
  const listingId = req.params.id;
  console.log(listingId);

  Listing.findByIdAndRemove(listingId)
    .then( () => {
      res.redirect("/myboats");
    })
    .catch(err => {
      next(err);
    });
});


// POST from new Movie Form //=>adds Boat
router.post("/add", parser.single('photo'), (req, res) => {
  let imageURL;

  if(req.file ){ 
    imageURL =  req.file.secure_url
  } 

  let {
    name,
    type,
    street,
    streetNumber,
    city,
    //imageURL, //<-- for claudinary
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
router.get("/addboat", (req, res) => {
  let user = false; // 
  if(req.session.currentUser){ // checker if user is logged in to display correct navbar
    user = req.session.currentUser //
  }
  res.render("addboat", {user}) 
})

// GET listensto /listing/ID and show detail


// GET listens to /myboats and shows overview
router.get("/", (req, res) => {
  let user = false; //
  if(req.session.currentUser){ // checker if user is logged in to display correct navbar
    user = req.session.currentUser //
  }
  let userListings = req.session.currentUser.listings
  console.log("USER LISTINGS", userListings)
  Listing.find({userListings})
    .then((result) => {
      res.render("myboats", {result, user})
    })
    .catch((err) => console.log(err));
})


module.exports = router;