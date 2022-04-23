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
exports.ApplicationDocumentsModel = void 0;
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const user_model_1 = require("../../user/models/user.model");
const application_model_1 = require("../application.model");
let ApplicationDocumentsModel = class ApplicationDocumentsModel extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.UUID, defaultValue: sequelize_1.UUIDV4, primaryKey: true, }),
    __metadata("design:type", String)
], ApplicationDocumentsModel.prototype, "application_documents_uuid", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => application_model_1.ApplicationModel),
    __metadata("design:type", String)
], ApplicationDocumentsModel.prototype, "application_uuid", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => application_model_1.ApplicationModel, 'application_uuid'),
    __metadata("design:type", user_model_1.User)
], ApplicationDocumentsModel.prototype, "application", void 0);
ApplicationDocumentsModel = __decorate([
    sequelize_typescript_1.Table
], ApplicationDocumentsModel);
exports.ApplicationDocumentsModel = ApplicationDocumentsModel;
//# sourceMappingURL=application-documents.model.js.map