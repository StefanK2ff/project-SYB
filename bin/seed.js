const mongoose = require("mongoose");
const Listing = require("../models/ListingModel");
const User = require("../models/UserModel");
const Booking = require("../models/BookingModel");
const listingSeeds = require("./seeddata/listingseeds.js");
const userSeeds = require("./seeddata/userseeds.js");

require('dotenv').config();

// Connect DB
mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    //1. Drop DB
    .then(connectionObj => {
        const promise = connectionObj.connection.dropDatabase();
        return promise
    })
    // 2. create the Listings (no dependencies) 
    .then(() => {
        return Listing.create(listingSeeds)
    })
    // 3. create the Users with dependencie to listing. Key is name
    .then(() => {
        //let counter = 0;
        let promises =  userSeeds.map((element, counter) => {
            return Listing.findOne({
                    name: element.firstName
                })
                .then(function (listing) {
                    return User.create({
                            firstName: userSeeds[counter].firstName,
                            lastName: userSeeds[counter].lastName,
                            email: userSeeds[counter].email,
                            password: userSeeds[counter].password,
                            listings: listing._id})
                            .then(() => {
                                counter++
                                console.log("counter ", counter)
                            })
                            .catch((err) => console.error('Error occured', err))
                })
                .catch((err) => console.log("find listing by name ", err));
        })
        const allDonePromises = Promise.all(promises)
        return allDonePromises
    })
    //4. finish and close connection
    .then(() => {
        console.log("Listings and Users created");
        return mongoose.connection.close(); // also a promise
    })
    .then(() => console.log("connection closed"))
    .catch((err) => console.error('Error occured', err))