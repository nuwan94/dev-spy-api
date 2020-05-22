const status = require("http-status");

module.exports = function(app) {
    app.get("/", (req, res) => {
        res.send(`<center>
        <h1>Nuwan 94 API</h1>
        <p>This is a simple API develoepd with nodejs from scratch to privde data for nuwan.dev frontend.</p>
        <p>2020 © | nuwan.dev</p></center>`);
    });
};