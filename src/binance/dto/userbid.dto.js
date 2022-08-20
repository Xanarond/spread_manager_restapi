"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var class_validator_1 = require("class-validator");
var UserBid = /** @class */ (function () {
    function UserBid() {
    }
    __decorate([
        (0, class_validator_1.IsInt)()
    ], UserBid.prototype, "amountAfterEditing");
    __decorate([
        (0, class_validator_1.IsString)()
    ], UserBid.prototype, "payType");
    __decorate([
        (0, class_validator_1.IsInt)()
    ], UserBid.prototype, "price");
    __decorate([
        (0, class_validator_1.IsString)()
    ], UserBid.prototype, "asset");
    __decorate([
        (0, class_validator_1.IsString)()
    ], UserBid.prototype, "fiatUnit");
    __decorate([
        (0, class_validator_1.IsInt)()
    ], UserBid.prototype, "minSingleTransAmount");
    __decorate([
        (0, class_validator_1.IsInt)()
    ], UserBid.prototype, "maxSingleTransAmount");
    __decorate([
        (0, class_validator_1.IsInt)()
    ], UserBid.prototype, "tradableAmount");
    return UserBid;
}());
exports["default"] = UserBid;
