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
                dialect: 'postgres',
                host: 'ec2-34-207-12-160.compute-1.amazonaws.com',
                database: 'ddvfj81k4rp18m',
                username: 'asrpzfflhiitsg',
                password: 'e7f69603debd4cd4db4d95b9470ec18e9b5f65e8dc79da5b8ff30d6e4d7bbd6e',
                port: 5432,
                ssl: true,
                dialectOptions: {
                    ssl: { require: true, rejectUnauthorized: false }
                },
            }),
            user_module_1.UserModule,
            accounts_module_1.AccountsModule,
            applications_module_1.ApplicationsModule,
            profile_module_1.ProfileModule,
            auth_module_1.AuthModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map