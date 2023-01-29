const express = require('express');
var compression = require('compression');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const nodemailer = require('nodemailer');
const otplib = require('otplib');


//use
app.use(express.json());
app.use(cors());
app.use(compression());

//local

app.post('/', (req, res) => {
    //res.send('we are on /').status(200);
    // Generate a 6-digit OTP




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
    to: 'vijay2045raj@gmail.com',
    subject: 'OTP',
    text: otp
};

transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
        res.send(error);
    } else {
        console.log('Email sent: ' + info.response + "   otp=" + otp);
        res.send('Email sent: ' + info.response).status(200);
    }
});
    

});


//server 
var port = 3000
app.listen(port, () => {
    console.log("server listening on port:" + port);
});