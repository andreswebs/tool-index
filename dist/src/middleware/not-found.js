"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = require("../errors");
function notFound(_req, _res, next) {
    return next(new errors_1.HTTPError(404, 'Not Found'));
}
exports.default = notFound;
