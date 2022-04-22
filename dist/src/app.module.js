"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./user/user.module");
const accounts_module_1 = require("./accounts/accounts.module");
const applications_module_1 = require("./applications/applications.module");
const profile_module_1 = require("./profile/profile.module");
const auth_module_1 = require("./auth/auth.module");
const event_emitter_1 = require("@nestjs/event-emitter");
const secrets_constants_1 = require("../secrets/secrets.constants");
const nestjs_1 = require("@adminjs/nestjs");
const user_model_1 = require("./user/models/user.model");
const profile_model_1 = require("./profile/models/profile.model");
const name_model_1 = require("./profile/models/name.model");
const residence_model_1 = require("./profile/models/residence.model");
const application_model_1 = require("./applications/models/application.model");
const account_model_1 = require("./accounts/models/account.model");
const clearing_periods_model_1 = require("./accounts/models/clearing_periods.model");
const deposit_product_model_1 = require("./accounts/models/deposit_product.model");
const fees_model_1 = require("./accounts/models/fees.model");
const limits_model_1 = require("./accounts/models/limits.model");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            event_emitter_1.EventEmitterModule.forRoot({
                wildcard: true,
            }),
            sequelize_1.SequelizeModule.forRoot({
                synchronize: true,
                autoLoadModels: true,
                logging: false,
                dialect: secrets_constants_1.DB_DIALECT,
                host: secrets_constants_1.DB_HOST,
                database: secrets_constants_1.DB_DATABASE,
                username: secrets_constants_1.DB_USERNAME,
                password: secrets_constants_1.DB_PASSWORD,
                port: secrets_constants_1.DB_PORT,
                ssl: true,
                dialectOptions: {
                    ssl: { require: true, rejectUnauthorized: false }
                },
            }),
            user_module_1.UserModule,
            accounts_module_1.AccountsModule,
            applications_module_1.ApplicationsModule,
            profile_module_1.ProfileModule,
            auth_module_1.AuthModule,
            nestjs_1.AdminModule.createAdmin({
                adminJsOptions: {
                    rootPath: '/admin',
                    resources: [
                        user_model_1.User,
                        profile_model_1.Profile,
                        name_model_1.Name,
                        residence_model_1.Residence,
                        application_model_1.Application,
                        account_model_1.AccountModel,
                        clearing_periods_model_1.ClearingPeriodsModel,
                        deposit_product_model_1.DepositProductModel,
                        fees_model_1.FeesModel,
                        limits_model_1.LimitsModel
                    ],
                }
            })
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map