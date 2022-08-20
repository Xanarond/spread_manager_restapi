"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.BinanceController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var userbid_entity_1 = require("./entities/userbid.entity");
var BinanceController = /** @class */ (function () {
    function BinanceController(binanceService) {
        this.binanceService = binanceService;
    }
    BinanceController.prototype.getCurrency = function () {
        return this.binanceService.getCurrency();
    };
    BinanceController.prototype.postUserBid = function (Bid) {
        return this.binanceService.postUserBid(Bid);
    };
    BinanceController.prototype.getUserBids = function () {
        return this.binanceService.postReformatObj();
    };
    __decorate([
        (0, common_1.Get)('/currency')
    ], BinanceController.prototype, "getCurrency");
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: 'Create request p2p' }),
        (0, swagger_1.ApiResponse)({
            status: 200,
            description: 'The found record',
            type: userbid_entity_1["default"]
        }),
        (0, common_1.Post)('/userbid'),
        __param(0, (0, common_1.Body)())
    ], BinanceController.prototype, "postUserBid");
    __decorate([
        (0, common_1.Get)('/userbids')
    ], BinanceController.prototype, "getUserBids");
    BinanceController = __decorate([
        (0, swagger_1.ApiTags)('Binance bids'),
        (0, common_1.Controller)('binance')
    ], BinanceController);
    return BinanceController;
}());
exports.BinanceController = BinanceController;
