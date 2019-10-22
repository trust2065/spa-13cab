# 13cab skill assessment

## Build

```cmd
yarn
cd client
yarn
cd ..
yarn start
```

## Introduction

### Backend

Restful API: express is being used to build `post / sendEmail` and `get / data`.
Once mailgun service down, sendgrid will take over. I use free plan on both email services.
I'm not 100% sure what 'No client library' should be used means, but currently I use 'sendgrid-nodejs' to implement my service. If this is not what you want, I am happy to amend it.
It support cors with white-list while it's only accept <http://www.localhost:3000> for now.
Use port 3001

### Frontend

I spend some time on material-ui and trying the use JSS to styling.
A few animations such as loading spinner and label scale down while focused.
Validation required for 'From', 'To', 'Subject' and 'Body'. Email validation for 'From', 'To', 'Cc' and 'Bcc' and help text shows below.
Sending status modal will popup after user 'send'. Also error message will show here if anything goes wrong.
Support latest Firefox, Chrome and IE11.
Use port 3000

## Reference

material-ui <https://material-ui.com/>
