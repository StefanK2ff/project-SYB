const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String
    },
    listings: [{
        type: Schema.Types.ObjectId,
        ref: "Listing"
    }],
    bookings: [{
        type: Schema.Types.ObjectId,
        ref: "Booking"
    }],
    favourites: [{
        type: Schema.Types.ObjectId,
        ref: "Listing"
    }],
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;