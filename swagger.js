const swaggerAutogen = require("swagger-autogen")();
const dotenv = require("dotenv");
dotenv.config();
const outputFile = "./swagger_output.json";
const endpointsFiles = ["./controllers/developer.js"];

let host_str = process.env.HOST;
if (process.env.MY_ENV == 'dev') {
    host_str += `:${process.env.PORT || 5050}`
}

const doc = {
    info: {
        version: "0.0.1",
        title: "Dev Spy API by Nuwan",
        description: "All in one API for Developer Statistics.<br/>This documentation is automatically generated with Swagger."
    },
    host: host_str,
    schemes: ['https'],
    tags: [{
        "name": "Statistics",
        "description": "Developer statistics in major platforms."
    }],
    definitions: {
        github: {
            "id": "25694570",
            "followers": 10,
            "following": 10,
            "public_gists": 1,
            "public_repos": 10
        },
        stackoverflow: {
            "account_id": 3760956,
            "badge_counts": {
                "bronze": 10,
                "silver": 10,
                "gold": 0
            },
            "link": "https://stackoverflow.com/users/3125964/nuwan-alawatta",
            "reputation": 1000,
            "reputation_change_day": 10,
            "reputation_change_month": 20,
            "reputation_change_quarter": 30,
            "reputation_change_week": 40,
            "reputation_change_year": 50
        },
    }
}

swaggerAutogen(outputFile, endpointsFiles, doc);