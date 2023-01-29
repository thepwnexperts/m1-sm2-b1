const { fork } = require('child_process');
const router = require('express').Router();
const verify = require('../schama/verify');
const nodemailer = require('nodemailer');
const otplib = require('otplib');

router.post('/', (req, res) => {
    const to = req.body.to;
    const secret = otplib.authenticator.generateSecret();
    const otp = otplib.authenticator.generate(secret);

    // Create a new child process to send the email
    const child = fork('../routes/send-email-worker.js');

    // Send the email data to the child process
    child.send({ to, otp });

    // Handle the response from the child process
    child.on('message', (response) => {
        if (response.error) {
            console.log(response.error);
            res.send(response.error);
        } else {
            console.log(`Email sent to ${to} with OTP ${otp}`);
            res.send({otp:otp}).status(200);
        }
    });
});

module.exports = router;
