"use strict";
//import { default as Animation } from "./animation/animation";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scroll = exports.Maus = void 0;
const maus_1 = __importDefault(require("./utils/maus"));
Object.defineProperty(exports, "Maus", { enumerable: true, get: function () { return maus_1.default; } });
const scroll_1 = __importDefault(require("./utils/scroll"));
Object.defineProperty(exports, "Scroll", { enumerable: true, get: function () { return scroll_1.default; } });
