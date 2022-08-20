"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var swagger_1 = require("@nestjs/swagger");
var UserbidEntity = /** @class */ (function () {
    function UserbidEntity() {
    }
    Object.defineProperty(UserbidEntity.prototype, "tradableAmount", {
        get: function () {
            return this._tradableAmount;
        },
        set: function (value) {
            this._tradableAmount = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserbidEntity.prototype, "maxSingleTransAmount", {
        get: function () {
            return this._maxSingleTransAmount;
        },
        set: function (value) {
            this._maxSingleTransAmount = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserbidEntity.prototype, "minSingleTransAmount", {
        get: function () {
            return this._minSingleTransAmount;
        },
        set: function (value) {
            this._minSingleTransAmount = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserbidEntity.prototype, "fiatUnit", {
        get: function () {
            return this._fiatUnit;
        },
        set: function (value) {
            this._fiatUnit = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserbidEntity.prototype, "asset", {
        get: function () {
            return this._asset;
        },
        set: function (value) {
            this._asset = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserbidEntity.prototype, "price", {
        get: function () {
            return this._price;
        },
        set: function (value) {
            this._price = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserbidEntity.prototype, "payType", {
        get: function () {
            return this._payType;
        },
        set: function (value) {
            this._payType = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserbidEntity.prototype, "amountAfterEditing", {
        get: function () {
            return this._amountAfterEditing;
        },
        set: function (value) {
            this._amountAfterEditing = value;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: 'объём после совершенной сделки если не ликвидировали ордер полностью'
        })
    ], UserbidEntity.prototype, "_amountAfterEditing");
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: 'Тип сделки'
        })
    ], UserbidEntity.prototype, "_payType");
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: 'Текущая цена покупки/продажи'
        })
    ], UserbidEntity.prototype, "_price");
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: 'доступная сумма для сделки'
        })
    ], UserbidEntity.prototype, "_tradableAmount");
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: 'валюта обмена'
        })
    ], UserbidEntity.prototype, "_asset");
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: 'Тип единиц фиатной валюты на обмен'
        })
    ], UserbidEntity.prototype, "_fiatUnit");
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: 'Минимальная сумма для совершения обмена'
        })
    ], UserbidEntity.prototype, "_minSingleTransAmount");
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: 'Максимальная сумма для совершения обмена'
        })
    ], UserbidEntity.prototype, "_maxSingleTransAmount");
    return UserbidEntity;
}());
exports["default"] = UserbidEntity;
