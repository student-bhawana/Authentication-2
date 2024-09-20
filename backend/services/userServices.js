const { generateToken } = require("../middleware/verifyToken")
const User = require("../model/usersModel")
const bcrypt = require("bcrypt")

module.exports = {
    signupUser: async (req, res) => {
        try {
            const { userName, email, password } = req.body
            const alreadyEmailExists = await User.findOne({ email })
            if (alreadyEmailExists) {
                return res.json({ sucess: false, message: "This Email Already Exists", data: {} })
            }

            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password, salt)
            const payload = {
                userName, email, password: hashPassword
            }
            const user = new User(payload)
            const newUser = await user.save()

            return res.json({
                success: true,
                message: "User Signup Successfully",
                id: newUser._id
            })
        } catch (err) {
            return res.json({
                success: false,
                message: err.message,
                data: {}
            })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body
            const userDetail = await User.findOne({ email }).lean()
            if (!userDetail) {
                return res.json({ success: false, message: "User not found", data: {} })
            }
            const checkPassword = await bcrypt.compare(password, userDetail.password)
            if (!checkPassword) {
                return res.json({
                    success: false,
                    message: "Wrong credentials",
                    data: {}
                })
            }
            delete userDetail.password
            userDetail.role = "user"
            const token = await generateToken(userDetail)
            return res.json({
                success: true,
                message: "Login Successfully",
                data: { token, ...userDetail }
            })
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
            const allAlerts = [
                { name: 'Unidentified Tyre', value: 351 },
                { name: 'Missing Tyre', value: 125 },
                { name: 'Low NSD', value: 145 },
                { name: 'Pending Alignment', value: 275 }
            ]
            const allSummary = [
                { name: 'Total Vehicles', value: 220 },
                { name: 'Total Tyres', value: 456 },
                { name: 'Tyres on Wheel', value: 345 },
                { name: 'Tyres in Scrap', value: 276 }
            ]
            const pendingAction = [
                {
                    date: '21 Aug 24',
                    category: 'Inspection',
                    typeSN: 'CZ800913132021',
                    brand: 'Bridgestone',
                    model: 'XYZ123PQR',
                    vehicleNo: 'RJ 15 32 2290',
                    status: 'Completed'
                },
                {
                    date: '25 Aug 24',
                    category: 'Inspection-1',
                    typeSN: 'CZ800913132021-1',
                    brand: 'Bridgestone-1',
                    model: 'XYZ123PQR-1',
                    vehicleNo: 'RJ 15 32 2001',
                    status: 'Pending'
                }
            ]
            const chartData = [12, 19, 3, 5, 2, 3]
            const chartLabel = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange']
            const barChart = [
                {
                    label: 'Corporation A',
                    data: [3, 4, 3, 5, 4, 6],
                    backgroundColor: 'rgba(54, 162, 235, 0.8)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                }
            ]
            const barLabel = ['1979', '1980', '1981', '1982', '1983', '1984']
            return res.json({
                success: true,
                message: 'Fetch Data Successfully',
                data: { allAlerts, allSummary, pendingAction, chartData, chartLabel, barChart, barLabel }
            })
        } catch (err) {
            return res.json({
                success: false,
                message: err.message,
                data: {}
            })
        }
    }
}