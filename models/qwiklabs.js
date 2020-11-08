const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let qwiklabs = new Schema({
    username: { type: String },
    labs: { type: Number },
    quests: { type: Number },
}, { collection: "qwiklabs", timestamps: true });

module.exports = mongoose.model("qwiklabs", qwiklabs);