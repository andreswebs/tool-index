"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPError = void 0;
var HTTPError = (function (_super) {
    __extends(HTTPError, _super);
    function HTTPError(status, message, opt) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        _this.name = 'HTTPError';
        _this.status = status;
        _this.cause = opt === null || opt === void 0 ? void 0 : opt.cause;
        _this.expose = (opt === null || opt === void 0 ? void 0 : opt.expose) || false;
        Error.captureStackTrace(_this);
        return _this;
    }
    return HTTPError;
}(Error));
exports.HTTPError = HTTPError;
