"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_http_1 = require("node:http");
var api_1 = require("@opentelemetry/api");
var errors_1 = require("../errors");
function errorHandler(err, _req, res, _next) {
    var isHTTPError = err instanceof errors_1.HTTPError;
    var status = isHTTPError ? err.status : 500;
    var msg = isHTTPError
        ? err.expose
            ? err.message
            : node_http_1.STATUS_CODES[err.status]
        : node_http_1.STATUS_CODES[500];
    var cause = isHTTPError ? (err.expose ? err.cause : undefined) : undefined;
    var errorResponse = {
        error: "".concat(err.name, ": ").concat(msg),
        cause: cause,
    };
    var errorLog = {
        error: "".concat(err.name, ": ").concat(err.message),
        cause: err.cause,
        stack: err.stack,
    };
    try {
        var activeCtx = api_1.context.active();
        var currentSpan = api_1.trace.getSpan(activeCtx);
        if (currentSpan) {
            currentSpan.setAttributes({
                'sampling.priority': 1,
            });
            currentSpan.recordException(err);
            currentSpan.setStatus({ code: api_1.SpanStatusCode.ERROR });
        }
    }
    catch (e) {
        console.error(JSON.stringify({
            error: "".concat(e.name, ": ").concat(e.message),
            stack: e.stack,
        }));
    }
    console.error(JSON.stringify(errorLog));
    return res.status(status).json(errorResponse);
}
exports.default = errorHandler;
