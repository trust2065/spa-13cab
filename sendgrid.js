module.exports = function(mailInfo) {
  if (mailInfo) {
    const dotenv = require("dotenv");
    dotenv.config();
    const sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(process.env.SENDGRIDAPIKEY);

    // input: a@gmail.com; b@gmail.com;
    // output: [a@gmail.com, b@gmail.com]
    const formatEmailList = mails =>
      mails
        .trim()
        .replace(/\;$/, "")
        .split(";")
        .map(v => v.trim());

    const msg = {
      from: "test@example.com",
      to: mailInfo.to && formatEmailList(mailInfo.to),
      cc: mailInfo.cc && formatEmailList(mailInfo.cc),
      bcc: mailInfo.bcc && formatEmailList(mailInfo.bcc),
      subject: mailInfo.subject,
      text: mailInfo.text
    };
    // console.log(msg);

    return sgMail
      .send(msg)
      .then(msg => {
        return { success: true, statusCode: msg[0].statusCode, msg };
      })
      .catch(err => {
        return {
          success: false,
          errCode: err.code,
          errMsg: err.response
            ? err.response.body.errors[0].message
            : err.toString(),
          err
        };
      });
  } else {
    return {
      success: false,
      errMsg: "mailInfo undefined"
    };
  }
};
