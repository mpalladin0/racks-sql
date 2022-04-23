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
exports.ApplicationModel = void 0;
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const user_model_1 = require("../user/models/user.model");
const application_documents_model_1 = require("./documents/application-documents.model");
const application_form_model_1 = require("./forms/application-form.model");
let ApplicationModel = class ApplicationModel extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.UUID, defaultValue: sequelize_1.UUIDV4, primaryKey: true, }),
    __metadata("design:type", String)
], ApplicationModel.prototype, "application_uuid", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    __metadata("design:type", String)
], ApplicationModel.prototype, "user_uuid", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.User, 'user_uuid'),
    __metadata("design:type", user_model_1.User)
], ApplicationModel.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => application_documents_model_1.ApplicationDocumentsModel),
    __metadata("design:type", Array)
], ApplicationModel.prototype, "documents", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => application_form_model_1.ApplicationFormModel),
    __metadata("design:type", application_form_model_1.ApplicationFormModel)
], ApplicationModel.prototype, "form", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, defaultValue: 'ChooseBusinessOrIndividual' }),
    __metadata("design:type", String)
], ApplicationModel.prototype, "stage", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, defaultValue: 'Pending' }),
    __metadata("design:type", String)
], ApplicationModel.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, defaultValue: null }),
    __metadata("design:type", String)
], ApplicationModel.prototype, "unit_customer_id", void 0);
ApplicationModel = __decorate([
    sequelize_typescript_1.Table
], ApplicationModel);
exports.ApplicationModel = ApplicationModel;
//# sourceMappingURL=application.model.js.map