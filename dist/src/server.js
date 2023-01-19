"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./tracer");
var http_1 = __importDefault(require("http"));
var app_1 = __importDefault(require("./app"));
var utils_1 = require("./utils");
var constants_1 = require("./constants");
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    var bind = typeof constants_1.port === 'string' ? "pipe ".concat(constants_1.port) : "port ".concat(constants_1.port);
    switch (error.code) {
        case 'EACCES':
            console.error("".concat(bind, " requires elevated privileges"));
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error("".concat(bind, " is already in use"));
            process.exit(1);
            break;
        default:
            throw error;
    }
}
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.log("listening on ".concat(bind));
}
function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}
app_1.default.set('port', normalizePort(constants_1.port));
var server = http_1.default.createServer(app_1.default);
server.listen(constants_1.port);
server.on('error', onError);
server.on('listening', onListening);
(0, utils_1.handleSignals)(server);
exports.default = server;
