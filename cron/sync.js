const cron = require("node-cron");
const axios = require("axios");

// Import mongo models
const GitHub = require("../models/github");
const StackOverflow = require("../models/stackoverflow");

// Sync github data to the DB
cron.schedule("0 * * * *", async function() {
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
cron.schedule("0 * * * *", async function() {
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