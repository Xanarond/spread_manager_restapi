"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BinanceModule = void 0;
var common_1 = require("@nestjs/common");
var binance_controller_1 = require("./binance.controller");
var binance_service_1 = require("./binance.service");
var axios_1 = require("@nestjs/axios");
var BinanceModule = /** @class */ (function () {
    function BinanceModule() {
    }
    BinanceModule = __decorate([
        (0, common_1.Module)({
            imports: [axios_1.HttpModule],
            controllers: [binance_controller_1.BinanceController],
            providers: [binance_service_1.BinanceService]
        })
    ], BinanceModule);
    return BinanceModule;
}());
exports.BinanceModule = BinanceModule;
