const fs = require("fs");
const path = require("path");
const cron = require("node-cron");
const axios = require("axios");

let cronInterval = "0 * * * *";

// Import mongo models
const GitHub = require("../models/github");
const StackOverflow = require("../models/stackoverflow");

// Sync github data to the DB
cron.schedule(cronInterval, async function() {
    let github = await axios.get(process.env.GITHUB_API_URL);
    if (github.data) {
        await GitHub.findOneAndUpdate({ id: github.data.id },
            github.data, {
                upsert: true,
            },
            (err) => {
                if (err) {
                    console.log("GitHub Error : " + err);
                } else {
                    console.log("GitHub Success : Data Saved Successfully");
                }
            }
        );
    }
});

// Sync stackoverflow data to the DB
cron.schedule(cronInterval, async function() {
    let stackoverflow = await axios.get(process.env.STACKOVERFLOW_API_URL);
    if (stackoverflow.data) {
        await StackOverflow.findOneAndUpdate({ account_id: stackoverflow.data.items[0].account_id },
            stackoverflow.data.items[0], {
                upsert: true,
            },
            (err) => {
                if (err) {
                    console.log("StackOverflow Error : " + err);
                } else {
                    console.log("StackOverflow Success : Data Saved Successfully");
                }
            }
        );
    }
});

// Cache Github Graph
cron.schedule(cronInterval, async function() {
    console.log("Downlaoding ghchart-image");
    const url = process.env.GH_CHARTS_URL;
    const temp = path.resolve(__dirname, "../public", "ghchart.svg");
    const writer = fs.createWriteStream(temp);
    const response = await axios({
        url,
        method: "GET",
        responseType: "stream",
    });
    response.data.pipe(writer);
});