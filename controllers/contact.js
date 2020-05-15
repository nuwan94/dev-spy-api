// const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");
const status = require("http-status");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = function(app) {
    app.post("/contact", (req, res) => {
        let { name, email, message } = req.body;
        if (!(name && email && message)) {
            res.send(status.BAD_REQUEST);
            return;
        } else {
            const sg = {
                to: process.env.SENDGRID_TO,
                from: process.env.SENDGRID_FROM,
                subject: `Message from ${name} <${email}>`,
                html: `Name : ${name}<br>
                     Email : ${email}<br>
                     <hr>
                     <p>${message}</p>`,
            };
            sgMail.send(sg).then(
                (res) => {
                    console.log(res);
                },
                (err) => {
                    if (err.response) {
                        console.error(err.response.body);
                    }
                }
            );
            res.send(status.OK);
        }
    });
};