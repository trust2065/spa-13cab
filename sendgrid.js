module.exports = function(mailInfo) {
  if (mailInfo) {
    const sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(
      "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"
    );

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
