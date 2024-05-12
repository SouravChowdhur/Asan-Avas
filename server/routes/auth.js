const router = require("express").Router()
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");


const User = require("../models/User")

// Configuration Multer for file upload
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

// User Register
router.post("/register", upload.single("profileImage"), async(req, res)=>{
    try{
        // Take all data from the form
        const {firstName, lastName, email, password} = req.body;
        // The uploaded file is available as req.file
        const profileImage = req.file;
        if(!profileImage){
            return res.status(400).send("No File Uploaded");
        }

        // path to the uploaded profile photo
        const profileImagePath = profileImage.path;

        // Check if user exist
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(409).json({message: "user already exist"});
        }

        // Hash The Password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        // Create a new user
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            profileImagePath
        });
        await newUser.save()
        // send a successful message
        res.status(200).json({message: "user registered successfully", user: newUser})
    }
    catch(error){
           console.log(error);
           res.status(500).json({message: "Registration Failed", error: error.message})
    }
});

router.post("/login", async(req, res)=>{
    try{
          const {email, password} = req.body;
          const user = await User.findOne({email});
        //   console.log(user)
        if(!user){
            // console.log("not user");
            return res.status(409).json({message: "user does not exist"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid Credintials!"})
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);res
        delete user.password;
        res.status(200).json({token , user});
    }
    catch(err){
        console.log(err);
        res.status(500).send({err: err.message})
    }
})
module.exports = router