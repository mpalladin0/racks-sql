"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsModule = void 0;
const common_1 = require("@nestjs/common");
const accounts_service_1 = require("./accounts.service");
const accounts_controller_1 = require("./accounts.controller");
const sequelize_1 = require("@nestjs/sequelize");
const account_model_1 = require("./models/account.model");
const clearing_periods_model_1 = require("./models/clearing_periods.model");
const deposit_product_model_1 = require("./models/deposit_product.model");
const fees_model_1 = require("./models/fees.model");
const limits_model_1 = require("./models/limits.model");
const limits_durations_model_1 = require("./models/limits.durations.model");
const user_module_1 = require("../user/user.module");
let AccountsModule = class AccountsModule {
};
AccountsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            sequelize_1.SequelizeModule.forFeature([
                account_model_1.AccountModel,
                deposit_product_model_1.DepositProductModel,
                clearing_periods_model_1.ClearingPeriodsModel,
                fees_model_1.FeesModel,
                limits_model_1.LimitsModel,
                limits_durations_model_1.LimitsDurationModel,
            ]),
        ],
        controllers: [accounts_controller_1.AccountsController],
        providers: [accounts_service_1.AccountsService],
        exports: [sequelize_1.SequelizeModule]
    })
], AccountsModule);
exports.AccountsModule = AccountsModule;
//# sourceMappingURL=accounts.module.js.map