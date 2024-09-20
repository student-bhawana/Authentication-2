const mongoose = require("mongoose")

const usersSchema = new mongoose.Schema({
    userName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
},
{
    timestamps: true
})
const User = mongoose.model("user", usersSchema)
module.exports = User