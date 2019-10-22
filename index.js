var express = require("express");
var cors = require("cors");
var app = express();
const mailgun = require("./mailgun");
const sendgrid = require("./sendgrid");
var bodyParser = require("body-parser");

app.use(bodyParser.json());

var whitelist = ["http://localhost:3000"];
var corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};

// preflight
app.options("/sendEmail", cors());

app.post("/sendEmail", cors(), function(req, res) {
  // console.log("req.body: ", req.body);
  const mailInfo = req.body;

  mailgun(mailInfo).then(result => {
    // console.log("mailgun result: ", result);
    if (result.success) {
      res.json(result);
    } else {
      sendgrid(mailInfo).then(result => {
        // console.log("sendgrid result: ", result);
        res.json(result);
      });
    }
  });
});
app.get("/data", cors(corsOptions), function(req, res) {
  res.json({
    welcomeTitle: "Welcome, dear users!",
    welcomeSub: "Please fill this form to send email",
    description: "Note: please separate emails by ;"
  });
});

app.listen(3001, function() {
  console.log("Example app listening on port 3001!");
});
