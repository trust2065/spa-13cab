module.exports = function(mailInfo) {
  if (mailInfo) {
    const apiKey = "9090e7fa24405c2bc65e010bc12f553e-9c988ee3-fbb39271";

    var mailgun = require("mailgun.js");
    var mg = mailgun.client({
      username: "api",
      key: process.env.MAILGUN_API_KEY || `${apiKey}`
    });

    const sandbox = "sandboxad21c36b87cb4876a20fd80478b6a49a.mailgun.org";

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

    console.log("mailInfo: ", mailInfo);

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
