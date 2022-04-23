"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationsModule = void 0;
const common_1 = require("@nestjs/common");
const applications_service_1 = require("./applications.service");
const applications_controller_1 = require("./applications.controller");
const sequelize_1 = require("@nestjs/sequelize");
const application_form_model_1 = require("./forms/application-form.model");
const user_module_1 = require("../user/user.module");
const axios_1 = require("@nestjs/axios");
const profile_module_1 = require("../profile/profile.module");
const application_documents_model_1 = require("./documents/application-documents.model");
const application_model_1 = require("./application.model");
let ApplicationsModule = class ApplicationsModule {
};
ApplicationsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule,
            profile_module_1.ProfileModule,
            user_module_1.UserModule,
            sequelize_1.SequelizeModule.forFeature([
                application_model_1.ApplicationModel,
                application_form_model_1.ApplicationFormModel,
                application_documents_model_1.ApplicationDocumentsModel,
            ])
        ],
        controllers: [applications_controller_1.ApplicationsController],
        providers: [applications_service_1.ApplicationsService, common_1.Logger],
        exports: [sequelize_1.SequelizeModule]
    })
], ApplicationsModule);
exports.ApplicationsModule = ApplicationsModule;
//# sourceMappingURL=applications.module.js.map