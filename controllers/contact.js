const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.FOO,
        pass: process.env.BAR,
    },
});

module.exports = function(app) {
    app.post("/contact", async(req, res) => {
        let { name, email, message } = req.body;

        await transporter
            .sendMail({
                from: `"📫 ${name}" <${email}>`,
                to: process.env.FOOBAR,
                subject: `Message from ${name}`,
                html: `Name : ${name}<br>
            Email : ${email}<br>
            <hr>
            <p>${message.replace(/[\n]/g, "<br>")}</p>`,
            })
            .then(() => {
                res.sendStatus(200);
            })
            .catch(() => {
                res.sendStatus(404);
            });
    });
};