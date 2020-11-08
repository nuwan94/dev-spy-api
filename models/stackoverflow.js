const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let stackoverflow = new Schema({
    account_id: { type: String },
    reputation_change_year: { type: Number },
    reputation_change_quarter: { type: Number },
    reputation_change_month: { type: Number },
    reputation_change_week: { type: Number },
    reputation_change_day: { type: Number },
    reputation: { type: Number },
    link: { type: String },
    badge_counts: {
        type: {
            bronze: { type: String },
            silver: { type: String },
            gold: { type: String },
        },
    },
}, { collection: "stackoverflow", timestamps: true });

module.exports = mongoose.model("stackoverflow", stackoverflow);