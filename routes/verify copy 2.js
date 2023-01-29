const nodemailer = require('nodemailer');
const otplib = require('otplib');
const router = require('express').Router();
const verify = require('../schama/verify');
const waf = Boolean(process.env.waf);

router.post('/', async (req, res) => {
    const to = req.body.to;

    const secret = otplib.authenticator.generateSecret();
    const otp = otplib.authenticator.generate(secret);

    // Check if the mail exists in the DB more than 3 times
    const existingMail = await verify.find({
        mail: to
    });
    if (existingMail.length >= 3 && process.env.waf) {
        console.log(process.env.waf);
        res.status(400).send('Too many requests from this email');
        return;
    }

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

    if (process.env.waf === 'false') {
        transporter.sendMail(mailOptions, async function (error, info) {
            if (error) {
                console.log(error);
                res.send(error);
            } else {
                console.log('Email sent: ' + info.response + "   otp=" + otp);
                otpis = {
                    thisotp: otp
                }

                try {
                    const mail_verify = new verify({
                        mail: to,
                        otp: otp

                    });

                    let savequery = await mail_verify.save();
                    console.log(savequery);
                    res.send(otpis).status(200);

                } catch (err) {
                    res.status(400).send(err);
                }


                //res.send('Email sent: ' + info.response).status(200);
            }
        });
    } else {
        res.status(400).send('Too many OTP requests for this email');
    }
});

module.exports = router;