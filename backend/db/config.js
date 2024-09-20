const mongoose = require("mongoose")
const db = async () => {
    try {
        await mongoose.connect("mongodb+srv://bhawanakeshwani2001:25092001bhawana@cluster0.engig.mongodb.net/tasks", {
            useUnifiedTopology: true,
        })
        console.log("database is connected");
    } catch (error) {
        console.log("error", error);
    }
}

module.exports = db
