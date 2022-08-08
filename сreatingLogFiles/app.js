const format = require("node.date-time");
const { Console } = require("console");
const fs = require("fs");

const logLevel = {
    INFO: "INFO",
    DEBUG: "DEBUG",
    WARN: "WARN",
    ERROR: "ERROR"
}

const myLogger = new Console({
    stdout: fs.createWriteStream("log.txt")
});

class Log {
    constructor(data, level, message) {
        this.data = data;
        this.level = level;
        this.message = message;
    }

    writeLog() {
        return (`${this.data.toString()} [${this.level}] "${this.message}"`);
    }
}
const log1 = new Log(new Date().format("Y-MM-dd HH:mm:SS"),
    logLevel.INFO, "User credentials entered");

const log2 = new Log(new Date().format("Y-MM-dd HH:mm:SS"),
    logLevel.WARN, "Incorrect PIN");

const log3 = new Log(new Date().format("Y-MM-dd HH:mm:SS"),
    logLevel.INFO, "User credentials entered");

const log4 = new Log(new Date().format("Y-MM-dd HH:mm:SS"),
    logLevel.INFO, "User credentials validated");

const log5 = new Log(new Date().format("Y-MM-dd HH:mm:SS"),
    logLevel.WARN, "Failure communication with server");

myLogger.log(log1.writeLog());
myLogger.log(log2.writeLog());
myLogger.log(log3.writeLog());
myLogger.log(log4.writeLog());
myLogger.log(log5.writeLog());

