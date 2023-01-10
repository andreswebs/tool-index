"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_http_1 = require("node:http");
var errors_1 = require("../errors");
var debug_1 = __importDefault(require("debug"));
var debug = (0, debug_1.default)('errorHandler');
function errorHandler(err, _req, res, _next) {
    debug(err.toString());
    var isHTTPError = err instanceof errors_1.HTTPError;
    var status = isHTTPError ? err.status : 500;
    var msg = isHTTPError
        ? err.expose
            ? err.message
            : node_http_1.STATUS_CODES[err.status]
        : node_http_1.STATUS_CODES[500];
    return res.status(status).send({
        error: msg,
    });
}
exports.default = errorHandler;
