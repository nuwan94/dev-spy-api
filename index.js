const express = require("express");
app = express();

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')


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
require("./controllers/contact")(app);

app.use("/files", express.static(__dirname + "/public"));

// Serve Swagger UI
var options = {
    customSiteTitle: "Dev Spy API by Nuwan",
    explorer: false,
    customCss: '.swagger-ui .topbar { display: none }'
};
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerFile, options))


// App start on PORT
app.listen(process.env.PORT || 5000);
console.log(
    `Node server running on port http://${process.env.HOST}:${process.env.PORT || 5000}`
);