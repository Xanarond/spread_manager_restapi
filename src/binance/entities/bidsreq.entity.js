"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BinanceBid = void 0;
var swagger_1 = require("@nestjs/swagger");
var BinanceBid = /** @class */ (function () {
    function BinanceBid() {
        this.page = 1;
        this.rows = 10;
        this.payTypes = ['Tinkoff'];
        this.countries = ['RU'];
        this.publisherType = null;
        this.asset = 'USDT';
        this.fiat = 'RUB';
        this.tradeType = 'BUY';
        /*@ApiProperty({
          example: true,
          description: 'Проверка на мерчанта. Опциональный параметр',
        })
        private _merchantCheck = true;*/
        this.transAmount = 1000;
        this.proMerchantAds = false;
    }
    __decorate([
        (0, swagger_1.ApiProperty)({
            example: 1,
            description: 'Страница API'
        })
    ], BinanceBid.prototype, "page");
    __decorate([
        (0, swagger_1.ApiProperty)({
            example: 20,
            description: 'Количество полей'
        })
    ], BinanceBid.prototype, "rows");
    __decorate([
        (0, swagger_1.ApiProperty)({
            example: ['Tinkoff'],
            description: 'Тип платежной системы. Подавать одну в массиве'
        })
    ], BinanceBid.prototype, "payTypes");
    __decorate([
        (0, swagger_1.ApiProperty)({
            example: ['RU'],
            description: 'Страна. Подавать одну в массиве'
        })
    ], BinanceBid.prototype, "countries");
    __decorate([
        (0, swagger_1.ApiProperty)({
            example: 'merchant' || null,
            description: 'Тип сделки. Мерчант, либо оставить поле пустым'
        })
    ], BinanceBid.prototype, "publisherType");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 'USDT', description: 'Тип валюты обмена' })
    ], BinanceBid.prototype, "asset");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 'USD', description: 'Вид фиатной валюты' })
    ], BinanceBid.prototype, "fiat");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 'BUY', description: 'Вид сделки' })
    ], BinanceBid.prototype, "tradeType");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 10000, description: 'Сумма для обмена' })
    ], BinanceBid.prototype, "transAmount");
    __decorate([
        (0, swagger_1.ApiProperty)({
            example: false,
            description: 'Показывать объявления только от мерчантов PRO'
        })
    ], BinanceBid.prototype, "proMerchantAds");
    return BinanceBid;
}());
exports.BinanceBid = BinanceBid;
