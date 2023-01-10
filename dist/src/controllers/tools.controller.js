"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTool = exports.createTool = exports.getTools = void 0;
var errors_1 = require("../errors");
var tool_1 = __importDefault(require("../models/tool"));
function getTools(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, queryParams, query, tools, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = req.query.tag;
                    queryParams = tag ? { tags: { $all: tag } } : {};
                    query = tool_1.default.find(queryParams);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4, query.exec()];
                case 2:
                    tools = _a.sent();
                    return [2, res.json(tools)];
                case 3:
                    error_1 = _a.sent();
                    return [2, next(new errors_1.HTTPError(500, error_1.message || 'Internal Server Error', {
                            cause: error_1,
                        }))];
                case 4: return [2];
            }
        });
    });
}
exports.getTools = getTools;
function createTool(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var tool, _a, _b, error_2;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    tool = new tool_1.default(req.body);
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    _b = (_a = res).json;
                    return [4, tool.save()];
                case 2: return [2, _b.apply(_a, [_c.sent()])];
                case 3:
                    error_2 = _c.sent();
                    if (error_2.name === 'ValidationError') {
                        return [2, next(new errors_1.HTTPError(400, error_2.message || 'Bad Request', {
                                cause: error_2,
                                expose: true,
                            }))];
                    }
                    return [2, next(new errors_1.HTTPError(500, error_2.message || 'Internal Server Error', {
                            cause: error_2,
                        }))];
                case 4: return [2];
            }
        });
    });
}
exports.createTool = createTool;
function deleteTool(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var id, query, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    query = tool_1.default.findByIdAndRemove(id);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4, query.exec()];
                case 2:
                    _a.sent();
                    return [2, res.json({})];
                case 3:
                    error_3 = _a.sent();
                    if (error_3.name === 'CastError') {
                        return [2, next(new errors_1.HTTPError(404, "tool ID ".concat(id, " was not found"), {
                                cause: error_3,
                                expose: true,
                            }))];
                    }
                    return [2, next(new errors_1.HTTPError(500, error_3.message || 'Internal Server Error', {
                            cause: error_3,
                        }))];
                case 4: return [2];
            }
        });
    });
}
exports.deleteTool = deleteTool;
