"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var helmet_1 = __importDefault(require("helmet"));
var cors_1 = __importDefault(require("cors"));
var logger_1 = __importDefault(require("./middleware/logger"));
var not_found_1 = __importDefault(require("./middleware/not-found"));
var error_handler_1 = __importDefault(require("./middleware/error-handler"));
var tools_router_1 = __importDefault(require("./routes/tools.router"));
var db_1 = __importDefault(require("./db"));
var app = (0, express_1.default)();
(0, db_1.default)();
app.set('x-powered-by', false);
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(logger_1.default);
app.use(tools_router_1.default);
app.get('/health', function (_req, res) {
    return res.status(200).json({ msg: 'healthy' });
});
app.get('/', function (_req, res) {
    return res.status(204).send();
});
app.use(not_found_1.default);
app.use(error_handler_1.default);
exports.default = app;
