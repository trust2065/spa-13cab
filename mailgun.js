module.exports = function(mailInfo) {
  if (mailInfo) {
    const dotenv = require("dotenv");
    dotenv.config();

    var mailgun = require("mailgun.js");
    var mg = mailgun.client({
      username: "api",
      key: process.env.MAILGUNAPIKEY
    });

    const sandbox = process.env.MAILGUNSANDBOX;

    // input: a@gmail.com; b@gmail.com;
    // output: a@gmail.com,b@gmail.com
    const formatEmailList = mails =>
      mails
        .trim()
        .replace(/\;$/, "")
        .split(";")
        .map(v => v.trim())
        .reduce((result, v) => `${result}${v},`, "")
        .slice(0, -1);

    // console.log("mailInfo: ", mailInfo);

    // remove property if its value is undefined/null
    const mailProperties = JSON.parse(
      JSON.stringify({
        from: "test@example.com",
        to: mailInfo.to && formatEmailList(mailInfo.to),
        cc: mailInfo.cc && formatEmailList(mailInfo.cc),
        bcc: mailInfo.bcc && formatEmailList(mailInfo.bcc),
        subject: mailInfo.subject,
        text: mailInfo.text
      })
    );

    // console.log("mailProperties: ", mailProperties);

    return mg.messages
      .create(`${sandbox}`, mailProperties)
      .then(msg => {
        return { success: true, msg };
      })
      .catch(err => {
        return {
          success: false,
          errCode: err.status,
          errMsg: err.message,
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
