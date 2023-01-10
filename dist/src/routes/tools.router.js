"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var tools_controller_1 = require("../controllers/tools.controller");
router.route('/tools').get(tools_controller_1.getTools).post(tools_controller_1.createTool);
router.route('/tools/:id').delete(tools_controller_1.deleteTool);
exports.default = router;
