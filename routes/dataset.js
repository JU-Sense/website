const express = require("express");
const router = express.Router();
require("dotenv").config();

// Function to send Email
async function sendMail(toMail, sub, textBody) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"JUSense Dataset" <jusenseresearch@gmail.com>', // sender address
    to: toMail, // list of receivers
    subject: sub, // Subject line
    text: textBody, // plain text body
  });

  console.log("Message sent: %s", info.messageId);
}

router.get("/request", async (req, res) => {
  console.log(req.body);

  sendMail(
    req.body.email,
    "New Dataset request",
    `New Dataset Request details`
  ).catch(console.error);
  res.redirect("/dataset");
});

module.exports = router;
