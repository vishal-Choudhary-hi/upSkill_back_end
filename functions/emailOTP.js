const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
  service: process.env.SERVICE,
  host: process.env.HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAILID,
    pass: process.env.MAIL_PASSWORD,
  },
});
const emailOTP = async (data) => {
  const mailOptions = {
    from: process.env.MAILID,
    to: data.email,
    subject: "Email Verification",
    html: `
     <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Email Verification</title>
    <style>
      body {
        background-color: #f2f2f2;
      }
      table {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 10px;
      }
      h1 {
        font-size: 28px;
        margin-bottom: 20px;
      }
      p {
        font-size: 16px;
        line-height: 24px;
        margin-bottom: 10px;
      }
      strong {
        font-size: 18px;
      }
    </style>
  </head>
  <body>
    <table>
      <tr>
        <td>
        <div style="display: flex; align-items: baseline;">
        <img src="https://th.bing.com/th/id/R.2c91bc692bd5b5e9e99b9c592d12dab6?rik=FwhSor%2bKuQBU%2bQ&riu=http%3a%2f%2flofrev.net%2fwp-content%2fphotos%2f2014%2f10%2fV-logo.jpg&ehk=Dc3d0szV%2f9VyLwjog4hkjAX7M9Sth4hMyBQIqXiddTI%3d&risl=&pid=ImgRaw&r=0" alt="Logo" style="width: 50px; height: 50px; margin-right: 10px;"/>
        <h2 style="margin: 0;">DEV SITE</h2>
      </div>
      
          <h1>Email Verification</h1>
          <p>Hello,</p>
          <p>Your email ID was used to register for our site. Please use the verification code/OTP below to verify your Email ID.</p>
          <p>Verification Code/OTP: <strong>${data.OTP}</strong></p>
        </td>
      </tr>
    </table>
  </body>
</html>
    `,
  };
  let flag;
  transporter.sendMail(mailOptions, function (error, info) {
    if (error != null) {
      console.log("Email sending error", error);
      flag = false;
    } else {
      flag = true;
    }
  });
  return flag;
};
module.exports = emailOTP;
