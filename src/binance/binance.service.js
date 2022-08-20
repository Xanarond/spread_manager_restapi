"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
        while (_) try {
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
exports.__esModule = true;
exports.BinanceService = void 0;
var common_1 = require("@nestjs/common");
var rxjs_1 = require("rxjs");
var bidsreq_entity_1 = require("./entities/bidsreq.entity");
var BinanceService = /** @class */ (function () {
    function BinanceService(httpService) {
        this.httpService = httpService;
    }
    BinanceService.prototype.getCurrency = function () {
        var with_rub = this.httpService.get('https://api.binance.com/api/v3/ticker/price?symbols=["BTCRUB","BNBRUB","ETHRUB","USDTRUB","BUSDRUB","SHIBRUB"]');
        var with_usd = this.httpService.get('https://api.binance.com/api/v3/ticker/price?symbols=["BTCUSDT","BNBUSDT","ETHUSDT","BUSDUSDT","SHIBUSDT"]');
        return (0, rxjs_1.forkJoin)([with_rub, with_usd]).pipe((0, rxjs_1.map)(function (result) {
            return result.map(function (res) {
                return res.data;
            });
        }));
    };
    BinanceService.prototype.postUserBid = function (Bid) {
        return this.httpService
            .post('https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search', Bid)
            .pipe((0, rxjs_1.map)(function (response) {
            var adv_obj = response.data.data[0].adv;
            return {
                payType: Bid.payTypes[0],
                asset: adv_obj.asset,
                fiatUnit: adv_obj.fiatUnit,
                price: adv_obj.price,
                tradableAmount: adv_obj.tradableAmount,
                maxSingleTransAmount: adv_obj.maxSingleTransAmount,
                amountAfterEditing: adv_obj.amountAfterEditing,
                minSingleTransAmount: adv_obj.minSingleTransAmount
            };
        }));
    };
    BinanceService.prototype.postReformatObj = function () {
        return __awaiter(this, void 0, void 0, function () {
            var Payments, Assets, PubType, payments, assets, pubtype, bids, pay, asset, pub, Bid, obsbids$;
            var _this = this;
            return __generator(this, function (_a) {
                (function (Payments) {
                    Payments["Tinkoff"] = "Tinkoff";
                    Payments["QIWI"] = "QIWI";
                    Payments["RUBfiatbalance"] = "RUBfiatbalance";
                    Payments["YandexMoneyNew"] = "YandexMoneyNew";
                })(Payments || (Payments = {}));
                (function (Assets) {
                    Assets["USDT"] = "USDT";
                    Assets["BTC"] = "BTC";
                    Assets["BNB"] = "BNB";
                    Assets["BUSD"] = "BUSD";
                    Assets["ETH"] = "ETH";
                    Assets["RUB"] = "RUB";
                })(Assets || (Assets = {}));
                PubType = {
                    none_type: null,
                    merchant: 'merchant'
                };
                payments = Object.values(Payments);
                assets = Object.values(Assets);
                pubtype = Object.values(PubType);
                bids = [];
                for (pay in payments) {
                    for (asset in assets) {
                        for (pub in pubtype) {
                            Bid = new bidsreq_entity_1.BinanceBid();
                            Bid.payTypes = [payments[pay]];
                            Bid.asset = assets[asset];
                            Bid.publisherType = pubtype[pub] || null;
                            bids.push(Bid);
                        }
                    }
                }
                obsbids$ = (0, rxjs_1.of)(bids);
                /*const posts$ = new Observable();
                await obsbids$.forEach((value) => {
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  return merge([this.postUserBid(value)]);
                });
                posts$.subscribe((value) => console.log(value));*/
                //Todo доделать множественный выход
                return [2 /*return*/, obsbids$.pipe((0, rxjs_1.mergeMap)(function (value) {
                        return value.map(function (val) {
                            return _this.postUserBid(val).pipe((0, rxjs_1.map)());
                        });
                    }))];
            });
        });
    };
    BinanceService = __decorate([
        (0, common_1.Injectable)()
    ], BinanceService);
    return BinanceService;
}());
exports.BinanceService = BinanceService;
