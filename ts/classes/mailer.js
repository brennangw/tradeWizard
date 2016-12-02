var nodemailer = require('nodemailer');

class Mailer {
    constructor(smtpsAddress, fromString) {
        this.transporter = nodemailer.createTransport(smtpsAddress);
        this.from = fromString; // sender address
    }

    sendParentTradeFinishedEmail (parentTrade) {

        var mailOptions = {
            from: this.from, // sender address
            to: this.from, // add parent trade's user id here (the email)
            subject: ("Trade " + parentTrade.id + " Finished"), // Subject line
            text: 'Your trade with id ' + parentTrade.id + '  has been completed.', // plaintext body
            html: '<p>Your trade with id ' + parentTrade.id + '  has been completed.</p>' // html body
        };

        this.transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });
    }
}

module.exports = Mailer;