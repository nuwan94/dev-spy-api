const GitHub = require("../models/github");
const StackOverflow = require("../models/stackoverflow");
const Medium = require("../models/medium");
const Qwiklabs = require("../models/qwiklabs");

module.exports = function(app) {
    app.get("/github", function(_req, res) {
        /* 
        #swagger.tags = ['Statistics']
        #swagger.description = 'Stats from GitHub API.'
        #swagger.responses[200] = { 
            description: 'GitHub data successfully obtained.',
            schema: { $ref: "#/definitions/github" } 
        } 
        */
        GitHub.find({}, { _id: 0, __v: 0 }, (_err, data) => {
            res.send(data[0]);
        });
    });

    app.get("/stackoverflow", function(_req, res) {
        /* 
        #swagger.tags = ['Statistics']
        #swagger.description = 'Stats from StackExchange API.'
        #swagger.responses[200] = { 
            description: 'Stackoverflow data successfully obtained.',
            schema: { $ref: "#/definitions/stackoverflow" } 
        } 
        */
        StackOverflow.find({}, { _id: 0, __v: 0 }, (_err, data) => {
            res.send(data[0]);
        });
    });


    app.get("/medium", async function(_req, res) {
        /* 
        #swagger.tags = ['Statistics']
        #swagger.description = 'Stats from Medium Website.'
        #swagger.responses[200] = { 
            description: 'Medium data successfully obtained.',
            schema: { $ref: "#/definitions/medium" } 
        } 
        */
        Medium.find({}, { _id: 0, __v: 0 }, (_err, data) => {
            res.send(data[0]);
        });
    });


    app.get("/qwiklabs", async function(_req, res) {
        /* 
        #swagger.tags = ['Statistics']
        #swagger.description = 'Stats from Qwiklabs Public Profile.'
        #swagger.responses[200] = { 
            description: 'Medium data successfully obtained.',
            schema: { $ref: "#/definitions/qwiklabs" } 
        } 
        */
        Qwiklabs.find({}, { _id: 0, __v: 0 }, (_err, data) => {
            res.send(data[0]);
        });
    });


};