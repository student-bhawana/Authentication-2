const express = require("express")
const app = express()
const cors = require('cors')
const userRoute = require("./route/userRoute")
const db = require("./db/config")

// for connect mongodb database
db()

app.use(cors())
app.use(express.json())

// for routing
app.use("/api", userRoute)

// Server is listen on 5000 Port
app.listen(5000, () => {
    console.log("Server is running");
})