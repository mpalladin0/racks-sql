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
exports.Name = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const profile_model_1 = require("./profile.model");
let Name = class Name extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_2.UUID, defaultValue: sequelize_1.UUIDV4, primaryKey: true }),
    __metadata("design:type", String)
], Name.prototype, "name_uuid", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Name.prototype, "first", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Name.prototype, "middle", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Name.prototype, "last", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => profile_model_1.Profile),
    __metadata("design:type", String)
], Name.prototype, "profile_uuid", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => profile_model_1.Profile),
    __metadata("design:type", profile_model_1.Profile)
], Name.prototype, "user", void 0);
Name = __decorate([
    sequelize_typescript_1.Table
], Name);
exports.Name = Name;
//# sourceMappingURL=name.model.js.map