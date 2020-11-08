const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let github = new Schema({
    id: { type: String },
    public_repos: { type: Number },
    public_gists: { type: Number },
    followers: { type: Number },
    following: { type: Number },
}, { collection: "github" });

module.exports = mongoose.model("github", github);