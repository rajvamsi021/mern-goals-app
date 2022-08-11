const jwt = require("jsonwebtoken");
const User = require("../models/goalsSchema");

const protected = async (req, res, next) => {
    try {
        const token = req.cookies.jwToken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        const rootUser = await User.findOne({_id: verifyToken, "tokens.token": token});

        if(!rootUser) {
            throw new Error("User not found");
        }

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();

    } catch(err) {
        console.log(err);
        res.status(400).send("Unauthorized no token provided.");
    }

}

module.exports = protected;