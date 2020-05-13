const GitHub = require("../models/github");
const StackOverflow = require("../models/stackoverflow");

module.exports = function(app) {
    app.get("/github", function(req, res) {
        GitHub.find({}, { _id: 0, __v: 0 }, (err, data) => {
            res.send(data[0]);
        });
    });

    app.get("/stackoverflow", function(req, res) {
        StackOverflow.find({}, { _id: 0, __v: 0 }, (err, data) => {
            res.send(data[0]);
        });
    });
};