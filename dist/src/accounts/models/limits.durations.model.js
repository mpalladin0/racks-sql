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
exports.LimitsDurationModel = void 0;
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const limits_model_1 = require("./limits.model");
let LimitsDurationModel = class LimitsDurationModel extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.UUID, defaultValue: sequelize_1.UUIDV4, primaryKey: true }),
    __metadata("design:type", String)
], LimitsDurationModel.prototype, "limits_duration_uuid", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => limits_model_1.LimitsModel),
    __metadata("design:type", String)
], LimitsDurationModel.prototype, "limits_uuid", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => limits_model_1.LimitsModel, 'limits_uuid'),
    __metadata("design:type", limits_model_1.LimitsModel)
], LimitsDurationModel.prototype, "limits", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: false, defaultValue: 300, type: sequelize_1.DataTypes.DOUBLE }),
    __metadata("design:type", Number)
], LimitsDurationModel.prototype, "daily", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: false, defaultValue: 2100, type: sequelize_1.DataTypes.DOUBLE }),
    __metadata("design:type", Number)
], LimitsDurationModel.prototype, "weekly", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: false, defaultValue: 8400, type: sequelize_1.DataTypes.DOUBLE }),
    __metadata("design:type", Number)
], LimitsDurationModel.prototype, "monthly", void 0);
LimitsDurationModel = __decorate([
    sequelize_typescript_1.Table
], LimitsDurationModel);
exports.LimitsDurationModel = LimitsDurationModel;
//# sourceMappingURL=limits.durations.model.js.map