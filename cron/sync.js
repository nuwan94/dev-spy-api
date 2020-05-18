const fs = require("fs");
const path = require("path");
const cron = require("node-cron");
const axios = require("axios");
const sharp = require("sharp");

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
    const response = await axios({
        url: process.env.GH_CHARTS_URL,
        method: "GET",
        responseType: "arraybuffer",
    });

    const outputPath = path.resolve(__dirname, "../public", "ghchart.webp");
    sharp(Buffer.from(response.data))
        .flatten({ background: { r: 255, g: 255, b: 255 } })
        .webp()
        .toFile(outputPath)
        .then((info) => {
            console.log("Downloaded ghchart and converted.");
            console.log(info);
        })
        .catch((err) => {
            console.log(err);
        });
});