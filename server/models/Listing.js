const mongoose = require("mongoose")

const ListingSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    category: {
        type: String,
        required: true
    },

    type: {
        type: String,
        required: true
    },

    streetAddress: {
        type: String,
        required: true
    },

    houseName: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    district: {
        type: String,
        required: true
    },

    country: {
        type: String,
        required: true
    },

    guestCount: {
        type: Number,
        required: true
    },

    bedroomCount: {
        type: Number,
        required: true
    },

    bedCount: {
        type: Number,
        required: true
    },

    washroomCount: {
        type: Number,
        required: true
    },

    amenities: {
        type: Array,
        default: []
    },

    listingPhotoPaths: [{ type: String }],

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    heighlight: {
        type: String,
        required: true
    },

    heighlightDescription: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },


},
    { timestamps: true }
)

const Listing = mongoose.model("Listing", ListingSchema)
module.exports = Listing