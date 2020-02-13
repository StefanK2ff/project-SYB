
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adressSchema = new Schema (
{ street: String,
  streetNumber: String,
  zipCode: String,
  city: String,
  province: String,
  country: String
}  
);

const listingSchema = new Schema(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    name: {
      type: String,
      required: true
    },
    type: {
      type: Array,
      required: true,
      enum: ["canoe", "kayak", "rowing", "inflatable", "paddle", "boat"]
    },
    locationAdress: {
      
      street: { type: String, required: true },
      streetNumber: { type: String, required: true },
      city: { type: String, required: true },
      province: { type: String },
      country: {type: String }
    },

    locationGeoCoord: {
      type: { type: String },
      coordinates: [] 
    },
    notAvailableDates: {
      type: Array,
      required:true
    },
    imageURL: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true

    },
    forMaxNumOfUsers: {
      type: Number,
      required: true
    },
    brand: {
      type: String,
    }
  }, 
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;