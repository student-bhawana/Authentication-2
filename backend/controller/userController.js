const userServices = require("../services/userServices")
module.exports = {
    signupUser: async (req, res) => {
        try {
            await userServices.signupUser(req, res)
        } catch (error) {
            return res.json({
                success: false,
                message: error.message,
                data: {}
            })
        }
    },
    login: async (req, res) => {
        try {
            await userServices.login(req, res)
        } catch (error) {
            return res.json({
                success: false,
                message: error.message,
                data: {}
            })
        }
    },
    userData: async (req, res) => {
        try {
            await userServices.userData(req, res)
        } catch (error) {
            return res.json({
                success: false,
                message: error.message,
                data: {}
            })
        }
    }
}