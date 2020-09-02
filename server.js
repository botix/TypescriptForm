"use strict";
exports.__esModule = true;
var express = require("express");
var path = require("path");
var fs = require("fs");
var app = express();
app.use(express.static(path.join(__dirname, "/client/dist")));
app.use(express.json());
app.get("/", function (req, res) {
    res.sendFile("index.html", { root: path.join(__dirname, "/client/dist") });
});
var formEndpoint = "/formsubmit";
app.post(formEndpoint, function (req, res) {
    fs.writeFile("formData", JSON.stringify(req.body), function (err) {
        if (err)
            throw err;
        res.status(200).send("Success");
        console.log("Form data written to the formData file");
    });
});
var PORT = 8080;
app.listen(PORT, function () {
    console.log("Server is running at https://localhost:" + PORT);
});
