const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const protect = require("../middleware/protected");
const User = require("../models/goalsSchema");
const cookieParser = require("cookie-parser");

router.use(cookieParser());

router.get("/", (req, res) => {
    res.status(200).json({message: "Home page"});
});

router.post("/register", async (req, res) => {
    const {name, email, password, cpassword} = req.body;

    if(!name || !email || !password || !cpassword) {
        return res.status(400).json({error: "Please enter all fields."});
    }

    if(password !== cpassword) {
        return res.status(400).json({error: "Passowords doesn't match."});
    }

    try {
        const userExists = await User.findOne({email: email});

        if(userExists) {
            res.status(400).json({error: "Account already exists."});
        }
        else {
            const new_user = new User({name, email, password, cpassword});

            await new_user.save();

            res.status(200).json({message: "User Registered Successfully."});
        }

    } catch(err) {
        console.log(err);
    }
});


router.post("/login", async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password ) {
        res.status(400).json({error: "Please enter all fields."});
    }

    try {
        const userExists = await User.findOne({email: email});
        if(!userExists) {
            res.status(400).json({error: "Invalid Credentials."});
        }
        else {
            const verifyPasswords = await bcrypt.compare(password, userExists.password);

            const token = await userExists.generateAuthToken();
            console.log(token);

            // storing the token in cookie.
            res.cookie("jwToken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });

            if(!verifyPasswords) {
                res.status(400).json({error: "Invalid Credentials."});
            }
            else {
                res.status(200).json({message: "Login Successful.", user: userExists});
            }
        }
    } catch(err) {
        console.log(err);
    }

});


router.post("/create", protect, async (req, res) => {
    const goalName = req.body.goal;
    if(!goalName) {
        res.status(400).json({error: "Please enter goal name."});
    }

    const user = req.rootUser;
    user.goals.push({goal: goalName});
    await user.save();
    res.status(200).json({message: "Goal Added."});
});


router.get("/getdata", protect, (req, res) => {
    res.send(req.rootUser);
});


router.get("/logout", (req, res) => {
    res.clearCookie('jwToken', {path: '/'});
    res.status(200).send("User Logout");
});


router.delete("/deletegoal/:id", protect, async (req, res) => {
    console.log(req.params.id)
    await User.updateOne({_id: req.userID}, {$pull: {goals: {_id: req.params.id}}});
    res.status(200).json({message: "Goal deleted successfully."});
});


router.post("/updategoal/:id", protect, async (req, res) => {
    const new_text = req.body.goalEdit;
    if(!new_text) {
        return res.status(400).json({error: "Please enter goal name."});
    }
    await User.updateOne({_id: req.userID, "goals._id": req.params.id}, {$set: {"goals.$.goal": new_text}});
    res.status(200).json({message: "Goal updated successfully."});
});

module.exports = router;