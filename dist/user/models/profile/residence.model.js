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
exports.Residence = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const profile_model_1 = require("./profile.model");
let Residence = class Residence extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_2.UUID, defaultValue: sequelize_1.UUIDV4, primaryKey: true }),
    __metadata("design:type", String)
], Residence.prototype, "residence_uuid", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ defaultValue: 'Primary' }),
    __metadata("design:type", String)
], Residence.prototype, "type", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Residence.prototype, "state", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Residence.prototype, "city", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Residence.prototype, "zip_code", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Residence.prototype, "address", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => profile_model_1.Profile),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Residence.prototype, "profile_uuid", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => profile_model_1.Profile),
    __metadata("design:type", profile_model_1.Profile)
], Residence.prototype, "profile", void 0);
Residence = __decorate([
    sequelize_typescript_1.Table
], Residence);
exports.Residence = Residence;
//# sourceMappingURL=residence.model.js.map