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
exports.User = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const account_model_1 = require("../../accounts/models/account.model");
const application_model_1 = require("../../applications/models/application.model");
const profile_model_1 = require("../../profile/models/profile.model");
let User = class User extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.UUID, defaultValue: sequelize_2.UUIDV4, primaryKey: true }),
    __metadata("design:type", String)
], User.prototype, "uuid", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ unique: true, validate: { isEmail: true, notEmpty: true } }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ validate: { notEmpty: true } }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], User.prototype, "unit_id", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => profile_model_1.Profile),
    __metadata("design:type", Array)
], User.prototype, "profile", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => application_model_1.Application),
    __metadata("design:type", Array)
], User.prototype, "applications", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => account_model_1.AccountModel),
    __metadata("design:type", Array)
], User.prototype, "accounts", void 0);
User = __decorate([
    sequelize_typescript_1.Table
], User);
exports.User = User;
//# sourceMappingURL=user.model.js.map