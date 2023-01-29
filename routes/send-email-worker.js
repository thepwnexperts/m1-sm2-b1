const router = require('express').Router();
const nodemailer = require('nodemailer');

process.on('message', (data) => {
    const { to, otp } = data;

    var transporter = nodemailer.createTransport({
        host: process.env.host,
        port: process.env.port,
        secure: true,
        auth: {
            user: process.env.user,
            pass: process.env.pass
        }
    });

    var mailOptions = {
        from: process.env.user,
        to,
        subject: 'OTP',
        text: otp
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            process.send({ error });
        } else {
            process.send({ info });
        }
    });
});

module.exports = router;