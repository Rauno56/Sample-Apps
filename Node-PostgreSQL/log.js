var winston = require('winston');
winston.add(winston.transports.File, {
    filename: "serverLog.log",
    colorize: true
});
// comment below line if you want to stop console logs.
// winston.remove(winston.transports.Console);
winston.log('info', 'Server started, The logs are being captured in ../serverLog.log');
module.exports = winston;