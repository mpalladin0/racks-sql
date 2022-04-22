"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileModule = void 0;
const common_1 = require("@nestjs/common");
const profile_service_1 = require("./profile.service");
const profile_controller_1 = require("./profile.controller");
const sequelize_1 = require("@nestjs/sequelize");
const profile_model_1 = require("./models/profile.model");
const residence_model_1 = require("./models/residence.model");
const name_model_1 = require("./models/name.model");
const user_module_1 = require("../user/user.module");
let ProfileModule = class ProfileModule {
};
ProfileModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            sequelize_1.SequelizeModule.forFeature([name_model_1.Name, residence_model_1.Residence, profile_model_1.Profile]),
        ],
        controllers: [profile_controller_1.ProfileController],
        providers: [profile_service_1.ProfileService],
        exports: [sequelize_1.SequelizeModule]
    })
], ProfileModule);
exports.ProfileModule = ProfileModule;
//# sourceMappingURL=profile.module.js.map