const jwt = require("jsonwebtoken")
const User = require("../model/usersModel")

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization || ""//postman se value get karte hai
    if (!token) {
        return res.status(400).json({ success: false, message: "Unauthorized", data: {} })
    }

    jwt.verify(token, "Bhawana", async (err, userDetail) => {
        if (err) {
            return res.status(400).json({ success: false, message: "Invalid Token", data: {} })
        }
        const user = await User.findOne({ _id: userDetail._id })
        if (!user) {
            return res.status(400).json({ success: false, message: "User Not Found", data: {} })

        }
        req.user = user
        next()
    })

}
const generateToken = async (userDeatil) => {
    return jwt.sign(userDeatil, "Bhawana", { expiresIn: "1h" })
}
module.exports = { verifyToken, generateToken }