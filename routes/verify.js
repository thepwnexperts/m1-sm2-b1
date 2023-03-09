const nodemailer = require('nodemailer');
const otplib = require('otplib');
const router = require('express').Router();
const verify = require('../schama/verify');
//const waf = Boolean(process.env.waf);
const waf = JSON.parse(process.env.waf);


router.post('/', async (req, res) => {
    //res.send('we are on /').status(200);
    // Generate a 6-digit OTP
    const to=req.body.to;

    const secret = otplib.authenticator.generateSecret();
    const otp = otplib.authenticator.generate(secret);
    var d = new Date();
    console.log(d);

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

try {
    const existingMail = await verify.find({mail: to});
    console.log(existingMail.length);
    if ((existingMail.length >= 1) && waf) {
        //res.status(400).send('Too many OTP requests for this email');
        //return;
        //clean up duplicate
        await verify.deleteMany({mail: to});
    }
} catch (err) {
    res.status(500).send(err);
    return;
}

transporter.sendMail(mailOptions, async function(error, info){
    if (error) {
        console.log(error);
        res.send(error);
    } else {
        console.log('Email sent: ' + info.response + "   otp=" + otp);
        otpis={
            thisotp:otp
        }

        try{
            const mail_verify=new verify(
                {
                    mail   :to,
                    otp    :otp
                });      
                
                let savequery = await mail_verify.save();
                console.log(savequery);
                //res.send(otpis).status(200);
                res.send("success").status(200);
                
            }catch(err)
            {
                res.status(400).send( err );
            }     
    }
});
    
});

router.post('/verify',async (req,res)=> {
    const to=req.body.from;
   const mails =  await verify.findOne({mail: to});
   if (!mails) {
    res.send("otp not found ,try to resend").status(400);
    return ;
   }
   //console.log(mails);
   const otpsend= mails.otp;
   const re = await verify.deleteMany({mail: to});
   res.send(otpsend).status(200);
});


module.exports = router;