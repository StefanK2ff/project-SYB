const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const bookingSchema = new Schema({
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    borrowerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    listingId: {
        type: Schema.Types.ObjectId,
        ref: 'Listing',
        required: true
    },
    bookingStart: {
        type: Date,
        default: Date.now,
        required: true
    },
    bookingEnd: {
        type: Date
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'declined'],
        required:true
    }
},
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    }
);

// create model + export model
module.exports = mongoose.model("Booking", bookingSchema);