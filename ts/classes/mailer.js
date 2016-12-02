var nodemailer = require('nodemailer');

class Mailer {
    constructor(smtpsAddress, fromString) {
        this.transporter = nodemailer.createTransport(smtpsAddress);
        this.from = fromString; // sender address
    }

    sendParentTradeFinishedEmail (parentTrade) {

        var mailOptions = {
            from: this.from, // sender address
            to: parentTrade.uid, // add parent trade's user id here (the email)
            subject: ("Trade " + parentTrade.id + " Finished"), // Subject line
            text: ('Your trade with id ' + parentTrade.id
            + '  has been completed.\nTrade Info Below:' +
            '\nETF: ' + parentTrade.equityId +
            '\nSide: ' + parentTrade.side +
            '\nQuantity: ' + parentTrade.qty +
            '\nTrade Id:'+ parentTrade.id
            ), // plaintext body
            html: ('<p>Your trade with id ' + parentTrade.id + '  has been completed.</p>' +
            '<h3>Trade Info Below: </h3>' +
            '<p>ETF: ' + parentTrade.equityId + '</p>' +
            '<p>Side: ' + parentTrade.side + '</p>' +
            '<p>Quantity: ' + parentTrade.qty + '</p>' +
            '<p>Trade Id: ' + parentTrade.id + '</p>')
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