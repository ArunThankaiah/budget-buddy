const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
    {
        name : {
            type : String,
            require: [true, 'User name require'],
            uppercase: true
        },
        phonenumber: {
            type: Number,
            require: [true, "Phone number require"],
            min: 10,
        },
        email: {
            type: String,
            require: [true, "Email is required"],
            uniq: true
        },
        password: {
            type: String,
            require: [true, "Password is required"],
            max: 15,
            min:8
        }
    },
    {timestamps: true}
)

const userModel = mongoose.model("User", userSchema)
module.exports = userModel