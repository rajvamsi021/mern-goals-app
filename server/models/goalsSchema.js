const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const goalsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        },
    ],
    goals: [
        {
            goal: {
                type: String,
                required: true
            }
        },
    ]
});

goalsSchema.pre("save", async function(next) {
    if(this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
});

// generation of authentication token.

goalsSchema.methods.generateAuthToken = async function() {
    try {
        let userToken = jwt.sign({_id: this._id}, process.env.SECRET_KEY);  // generate jwt token
        this.tokens = this.tokens.concat({token: userToken});   // storing it in db.
        await this.save();
        return userToken;
    }
    catch(err) {
        console.log(err);
    }
}

const User = mongoose.model("User", goalsSchema);

module.exports = User;