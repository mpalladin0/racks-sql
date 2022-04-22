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
exports.LimitsModel = void 0;
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const deposit_product_model_1 = require("./deposit_product.model");
const limits_durations_model_1 = require("./limits.durations.model");
let LimitsModel = class LimitsModel extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.UUID, defaultValue: sequelize_1.UUIDV4, primaryKey: true }),
    __metadata("design:type", String)
], LimitsModel.prototype, "limits_uuid", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => deposit_product_model_1.DepositProductModel),
    __metadata("design:type", String)
], LimitsModel.prototype, "deposit_product_uuid", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => deposit_product_model_1.DepositProductModel),
    __metadata("design:type", deposit_product_model_1.DepositProductModel)
], LimitsModel.prototype, "deposit_product", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => limits_durations_model_1.LimitsDurationModel, 'debit'),
    __metadata("design:type", Array)
], LimitsModel.prototype, "debit", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => limits_durations_model_1.LimitsDurationModel, 'credit'),
    __metadata("design:type", Array)
], LimitsModel.prototype, "credit", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => limits_durations_model_1.LimitsDurationModel, 'atm_withdrawl'),
    __metadata("design:type", Array)
], LimitsModel.prototype, "atm_withdrawl", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => limits_durations_model_1.LimitsDurationModel, 'deposit'),
    __metadata("design:type", Array)
], LimitsModel.prototype, "deposit", void 0);
LimitsModel = __decorate([
    sequelize_typescript_1.Table
], LimitsModel);
exports.LimitsModel = LimitsModel;
//# sourceMappingURL=limits.model.js.map