const express = require("express");
app = express();

// Importing env from environment
const dotenv = require("dotenv");
dotenv.config();

// Enable CORS
var cors = require("cors");
app.use(cors());

// Setup body parser
var bodyParser = require("body-parser");
app.use(bodyParser.json());

// Start mongodb connection
require("./db/connect");

// Start sync jobs
require("./cron/sync");

// Import controllers
require("./controllers/developer")(app);

// App start on PORT
app.listen(process.env.PORT || 5000);