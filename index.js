const express = require("express");
app = express();

// Importing env from environment
const dotenv = require("dotenv");
dotenv.config();

// Enable CORS
var cors = require("cors");
const corsOptions = {
    origin: 'https://nuwan.dev',
}
app.use(cors(corsOptions));

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

// Serve Swagger UI
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
var swaggeOptions = {
    customSiteTitle: "Dev Spy API by Nuwan",
    explorer: false,
    customCss: '.swagger-ui .topbar { display: none }'
};
app.use('/', cors(), swaggerUi.serve, swaggerUi.setup(swaggerFile, swaggeOptions))


// App start on PORT
app.listen(process.env.PORT || 5000);
console.log(
    `Node server running on port http://${process.env.HOST}:${process.env.PORT || 5000}`
);