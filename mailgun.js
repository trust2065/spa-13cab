var mailgun = require("mailgun.js");
var mg = mailgun.client({
  username: "api",
  key:
    process.env.MAILGUN_API_KEY ||
    "9090e7fa24405c2bc65e010bc12f553e-9c988ee3-fbb39271"
});

mg.messages
  .create("sandboxad21c36b87cb4876a20fd80478b6a49a.mailgun.org", {
    from: "Excited User <mailgun@sandbox-123.mailgun.org>",
    to: ["trust2065@gmail.com"],
    subject: "Hello",
    text: "Testing some Mailgun awesomeness!",
    html: "<h1>Testing some Mailgun awesomeness!</h1>"
  })
  .then(msg => console.log(msg)) // logs response data
  .catch(err => console.log(err)); // logs any error
