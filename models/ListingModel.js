const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    type: {
      type: String,
      required: true,
      enum: ["canoe", "kayak", "rowing", "inflatable", "paddle", "boat"]
    },
    locationAddress: {
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
      type: Array
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