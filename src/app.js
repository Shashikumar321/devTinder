const express = require("express");

const app = express();

app.use("/", (req, res) => {
    res.send("Hello from the dashboarddddd");
})

app.use("/test", (req, res) => {
    res.send("Test Test Test");
})

app.use("/hello", (req, res) => {
    res.send("Hello Hello Hello");
})

app.listen(4000, () => {
    console.log("Server is running")
});