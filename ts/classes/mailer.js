var nodemailer = require('nodemailer');

class Mailer {
    constructor(smtpsAddress, fromString) {
        this.transport = nodemailer.createTransport(smtpsAddress);
        this.from = fromString; // sender address
    }

    sendParentTradeFinishedEmail(parentTrade) {
        var msg = "Trade " + parentTrade.pid + " has finished.";
        msg += ("\nEtf Traded: " + parentTrade.equityId);
        msg += ("\nQuantity Traded: " + parentTrade.qty);
        msg += ("\nSide: " + parentTrade.side);
        var subject = "Trade " + parentTrade.pid + " Finished";
        var ops = {};
        ops.msg = msg;
        ops.subject = subject;
        ops.to = parentTrade.userId;
        ops.from = this.from;
        this.sendEmail(ops);
        return
    }

    sendEmail (ops) {
        this.transporter.sendMail(ops, function (error, info) {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        })
    }

}