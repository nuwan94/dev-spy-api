const cron = require("node-cron");
const axios = require("axios");
const cheerio = require('cheerio');

let cronInterval = process.env.CRON_INTERVAL;
/* 
// Temporary testing
const testCron = "* * * * *";
cronInterval = testCron; 
 */

// Import mongo models
const GitHub = require("../models/github");
const StackOverflow = require("../models/stackoverflow");
const Medium = require("../models/medium");
const Qwiklabs = require("../models/qwiklabs");

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
                    console.log("GitHub Success : Data Saved Successfully", github.data);
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
                    console.log("StackOverflow Success : Data Saved Successfully", stackoverflow.data);
                }
            }
        );
    }
});

// Sync medium data to the DB
cron.schedule(cronInterval, async function() {
    let followers_count = 0;
    let following_count = 0;
    let article_count = 0;

    await axios.get(process.env.MEDIUM_URI).then((response) => {
        const $ = cheerio.load(response.data);
        followers_count = $('a:contains("Followers")').first().text().split(" ")[0];
        following_count = $('a:contains("Following")').first().text().split(" ")[0];
    });

    await axios.get(process.env.MEDIUM_JSNO_FEED_URI)
        .then((res) => {
            article_count = res.data.items.length;
        });

    mediumData = {
        username: 'nsa94',
        article_count,
        followers: Number(followers_count),
        following: Number(following_count)
    };

    if (mediumData) {
        await Medium.findOneAndUpdate({ username: mediumData.username },
            mediumData, {
                upsert: true,
            },
            (err) => {
                if (err) {
                    console.log("Medium Error : " + err);
                } else {
                    console.log("Medium Success : Data Saved Successfully", mediumData);
                }
            }
        );
    }
});

// Sync qwiklabs data to the DB
cron.schedule(cronInterval, async function() {
    let labs = 0;
    let quests = 0;

    await axios.get(process.env.QWIKLABS_URI).then((response) => {
        const $ = cheerio.load(response.data);
        const stats = $('.public-profile__hero__details').text().replace(/\n/g, ' ').trim();
        labs = stats.split(" ")[0];
        quests = stats.split(" ")[4];
    });

    qwiklabsData = {
        username: 'nsa94',
        labs: Number(labs),
        quests: Number(quests),
    };

    if (qwiklabsData) {
        await Qwiklabs.findOneAndUpdate({ username: qwiklabsData.username },
            qwiklabsData, {
                upsert: true,
            },
            (err) => {
                if (err) {
                    console.log("Qwiklabs Error : " + err);
                } else {
                    console.log("Qwiklabs Success : Data Saved Successfully", qwiklabsData);
                }
            }
        );
    }
});
