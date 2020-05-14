const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.FOO,
        pass: process.env.BAR,
    },
});

module.exports = function(app) {
    app.post("/contact", (req, res) => {
        let { name, email, message } = req.body;
        console.log(req.body);

        return transporter.sendMail({
                from: `"📫 ${name}" <${email}>`,
                to: process.env.FOOBAR,
                subject: `Message from ${name}`,
                html: `Name : ${name}<br>
            Email : ${email}<br>
            <hr>
            <p>${message}</p>`,
            },
            (error, info) => {
                if (error) {
                    res.sendStatus(404);
                    console.log("Email failed: ", error);
                } else {
                    res.sendStatus(200);
                    console.log("Email sent: " + info.response);
                }
            }
        );
    });
};