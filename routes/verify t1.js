const nodemailer = require('nodemailer');
const otplib = require('otplib');
const router = require('express').Router();
const verify = require('../schama/verify');

router.post('/', (req, res) => {
    // Generate a 6-digit OTP
    const to = req.body.to;

    const secret = otplib.authenticator.generateSecret();
    const otp = otplib.authenticator.generate(secret);

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
        to: to,
        subject: 'OTP',
        text: otp
    };

    transporter.sendMail(mailOptions, async function (error, info) {
        if (error) {
            console.log(error);
            res.send(error);
        } else {
            await sendOTP(to, otp, res);
        }
    });
});

async function sendOTP(to, otp, res) {
    try {
        const existingMail = await verify.find({ mail: to });
        if (existingMail.length >= process.env.optrate && process.env.waf) {
            res.status(400).send("Too many attempts, please try again later.");
        } else {
            const mail_verify = new verify({
                mail: to,
                otp: otp
            });

            let savequery = await mail_verify.save();
            console.log(savequery);
            res.send({ thisotp: otp }).status(200);
        }
    } catch (err) {
        res.status(400).send(err);
    }
}

module.exports = router;