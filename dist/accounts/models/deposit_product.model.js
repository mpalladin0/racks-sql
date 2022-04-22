"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepositProductModel = void 0;
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const account_model_1 = require("./account.model");
const clearing_periods_model_1 = require("./clearing_periods.model");
const fees_model_1 = require("./fees.model");
const limits_model_1 = require("./limits.model");
let DepositProductModel = class DepositProductModel extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.UUID, defaultValue: sequelize_1.UUIDV4, primaryKey: true }),
    __metadata("design:type", String)
], DepositProductModel.prototype, "deposit_product_uuid", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => account_model_1.AccountModel),
    __metadata("design:type", String)
], DepositProductModel.prototype, "account_uuid", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => account_model_1.AccountModel),
    __metadata("design:type", account_model_1.AccountModel)
], DepositProductModel.prototype, "account", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], DepositProductModel.prototype, "purpose", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], DepositProductModel.prototype, "tier", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => fees_model_1.FeesModel),
    __metadata("design:type", fees_model_1.FeesModel)
], DepositProductModel.prototype, "fees", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => limits_model_1.LimitsModel),
    __metadata("design:type", limits_model_1.LimitsModel)
], DepositProductModel.prototype, "limits", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => clearing_periods_model_1.ClearingPeriodsModel),
    __metadata("design:type", clearing_periods_model_1.ClearingPeriodsModel)
], DepositProductModel.prototype, "clearing_periods", void 0);
DepositProductModel = __decorate([
    sequelize_typescript_1.Table
], DepositProductModel);
exports.DepositProductModel = DepositProductModel;
//# sourceMappingURL=deposit_product.model.js.map