const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config()
const cors = require("cors");
const authRoute = require("./routes/auth.js")
const listingRoute = require("./routes/Listing.js")

app.use(cors());
app.use(express.json());
app.use(express.static('public'))
app.use("/auth", authRoute)
app.use("/properties", listingRoute)

// Mongoose setup
const PORT = 3001;
mongoose.connect(process.env.MONGO_URL, {
    dbName: "Rent_House",
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server Port: ${PORT}`)
        })
    }).catch((error) => console.log(`${error} did not connect`))