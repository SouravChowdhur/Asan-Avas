const router = require("express").Router();
const multer = require("multer")
const User = require("../models/User")

const Listing = require("../models/Listing")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Set the destination folder where uploaded files will be stored
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        // Set the file name when saved on the server
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage });

router.post("/create", upload.array("listingPhotos"), async (req, res) => {
    try {
        const { creator, category, type, streetAddress, houseName, city, district, country, guestCount, bedroomCount, bedCount, washroomCount, amenities, title, description, heighlight, heighlightDescription, price } = req.body;



        const listingPhotos = req.files
        if (!listingPhotos) {
            return res.status(400).send("No File Uploaded")
        }
        const listingPhotoPaths = listingPhotos.map((file) => file.path);

        const newListing = new Listing({
            creator,
            category,
            type,
            streetAddress, houseName, city, district, country, guestCount, bedroomCount, bedCount, washroomCount, amenities, listingPhotoPaths, title, description, heighlight, heighlightDescription, price,
        })

        await newListing.save()

        res.status(200).json(newListing)

    }
    catch (err) {
        res.status(409).json({ msg: "Fail to create Listing", error: err.message })
        console.log(err)
    }
})




router.get("/", async (req, res) => {
    const qCategory = req.query.category
    try {
        let listings
        if (qCategory) {
            listings = await Listing.find({ category: qCategory }).populate("creator")
        }
        else {
            listings = await Listing.find()
        }

        res.status(200).json(listings)

    }
    catch (err) {
        res.status(404).json({ msg: "Fail to fetch Listings", error: err.message })
        console.log(err)
    }
})


module.exports = router;