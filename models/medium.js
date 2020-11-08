const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let medium = new Schema({
    username: { type: String },
    article_count: { type: Number },
    followers: { type: Number },
    following: { type: Number },
}, { collection: "medium", timestamps: true });

module.exports = mongoose.model("medium", medium);