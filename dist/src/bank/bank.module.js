"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var BankModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankModule = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("./constants");
const racksbank_service_1 = require("./racksbank.service");
const unit_service_1 = require("./unit.service");
let BankModule = BankModule_1 = class BankModule {
    static forRoot(options) {
        return {
            module: BankModule_1,
            global: true,
            providers: [
                {
                    provide: constants_1.CONFIG_OPTIONS,
                    useValue: options,
                },
                racksbank_service_1.RacksBank,
                unit_service_1.UnitServce,
            ],
            exports: [racksbank_service_1.RacksBank],
        };
    }
};
BankModule = BankModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], BankModule);
exports.BankModule = BankModule;
//# sourceMappingURL=bank.module.js.map