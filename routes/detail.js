var express = require('express');
var router = express.Router();
var Listing = require("../models/ListingModel");

router.get("/:id", (req, res) => {
    const listingId = req.params.id
    let user = false; // 
        if (req.session.currentUser) { // checker if user is logged in to display correct navbar
            user = req.session.currentUser //
        }

  Listing.findById(listingId)
    .then(listing => {
      res.render("boat-detail.hbs", {
        listing,
        user
      });
    })
    .catch(err => console.log(err));
});




module.exports = router;