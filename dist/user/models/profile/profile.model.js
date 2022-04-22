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
exports.Profile = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const user_model_1 = require("../user.model");
const residence_model_1 = require("./residence.model");
let Profile = class Profile extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_2.UUID, defaultValue: sequelize_1.UUIDV4, primaryKey: true }),
    __metadata("design:type", String)
], Profile.prototype, "profile_uuid", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Profile.prototype, "first_name", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Profile.prototype, "middle_name", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Profile.prototype, "last_name", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Profile.prototype, "dob", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => residence_model_1.Residence),
    __metadata("design:type", Array)
], Profile.prototype, "residence", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Profile.prototype, "user_uuid", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.User),
    __metadata("design:type", user_model_1.User)
], Profile.prototype, "user", void 0);
Profile = __decorate([
    sequelize_typescript_1.Table
], Profile);
exports.Profile = Profile;
//# sourceMappingURL=profile.model.js.map