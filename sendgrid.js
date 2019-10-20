// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require("@sendgrid/mail");
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
sgMail.setApiKey(
  "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"
);
const msg = {
  to: "wrong email address",
  // to: "trust2065@gmail.com",
  from: "test@example.com",
  subject: "Sending with Twilio SendGrid is Fun",
  text: "and easy to do anywhere, even with Node.js",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>"
};
sgMail
  .send(msg)
  .then(msg => {
    // console.log(msg);
    console.log(msg[0].statusCode);
  }) // logs response data
  .catch(err => {
    // console.log(JSON.stringify(err));
    console.log(JSON.stringify(err.response.body.errors[0].message));
    console.log("code: ", err.code);
    console.log("message: ", err.message);
  }); // logs any error;
