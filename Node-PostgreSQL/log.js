var winston = require('winston');
var logFile = require('path').join(__dirname, 'serverLog.log');

winston.add(winston.transports.File, {
    filename: logFile,
    colorize: true
});
// comment below line if you want to stop console logs.
// winston.remove(winston.transports.Console);
winston.log('info', 'Server started, The logs are being captured in ' + logFile);
module.exports = winston;
