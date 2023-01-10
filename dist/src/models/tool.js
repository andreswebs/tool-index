"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
var xss_filters_1 = __importDefault(require("xss-filters"));
var mongoose_hidden_1 = __importDefault(require("mongoose-hidden"));
var mongooseHidden = (0, mongoose_hidden_1.default)();
var ToolSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        maxlength: [120, 'Exceeded maximum length: 120 characters'],
        trim: true,
        required: true,
        unique: true,
    },
    link: {
        type: String,
        default: '',
        maxlength: [240, 'Exceeded maximum length: 120 characters'],
        trim: true,
    },
    description: {
        type: String,
        default: '',
        maxlength: [2400, 'Exceeded maximum length: 2400 characters'],
        trim: true,
    },
    tags: [
        {
            type: String,
            maxlength: [60, 'Exceeded maximum length: 60 characters'],
            trim: true,
            lowercase: true,
        },
    ],
}, { timestamps: true });
ToolSchema.set('toJSON', { virtuals: true });
ToolSchema.set('toObject', { virtuals: true });
ToolSchema.plugin(mongooseHidden, {
    hidden: { createdAt: true, updatedAt: true },
});
ToolSchema.plugin(mongoose_unique_validator_1.default);
ToolSchema.pre('save', function (next) {
    var props = Object.keys(this);
    try {
        for (var _i = 0, props_1 = props; _i < props_1.length; _i++) {
            var prop = props_1[_i];
            if (prop === 'title' || prop === 'description') {
                this[prop] = xss_filters_1.default.inHTMLData(this[prop]);
            }
            if (prop === 'link') {
                this[prop] = xss_filters_1.default.uriComponentInHTMLData(this[prop]);
            }
            if (prop === 'tags') {
                this[prop].map(function (tag) { return xss_filters_1.default.inHTMLData(tag); });
            }
        }
    }
    catch (error) {
        return next(error);
    }
    return next();
});
var Tool = mongoose_1.default.model('Tool', ToolSchema);
exports.default = Tool;
