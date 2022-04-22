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
exports.Application = exports.ApplicationStatus = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const user_model_1 = require("../../user/models/user.model");
var ApplicationStatus;
(function (ApplicationStatus) {
    ApplicationStatus["pending"] = "pending";
    ApplicationStatus["pending_review"] = "pending_review";
    ApplicationStatus["approved"] = "approved";
    ApplicationStatus["denied"] = "denied";
    ApplicationStatus["awaiting_documents"] = "awaiting_documents";
})(ApplicationStatus = exports.ApplicationStatus || (exports.ApplicationStatus = {}));
let Application = class Application extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_2.UUID, defaultValue: sequelize_1.UUIDV4, primaryKey: true }),
    __metadata("design:type", String)
], Application.prototype, "application_uuid", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Application.prototype, "url", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Application.prototype, "unit_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ defaultValue: 'pending' }),
    __metadata("design:type", String)
], Application.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    __metadata("design:type", String)
], Application.prototype, "user_uuid", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.User),
    __metadata("design:type", user_model_1.User)
], Application.prototype, "user", void 0);
Application = __decorate([
    sequelize_typescript_1.Table
], Application);
exports.Application = Application;
//# sourceMappingURL=application.model.js.map