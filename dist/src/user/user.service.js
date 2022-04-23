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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const user_model_1 = require("./models/user.model");
const bcrypt = require("bcrypt");
const profile_model_1 = require("../profile/models/profile.model");
const name_model_1 = require("../profile/models/name.model");
const residence_model_1 = require("../profile/models/residence.model");
const account_model_1 = require("../accounts/models/account.model");
const limits_model_1 = require("../accounts/models/limits.model");
const clearing_periods_model_1 = require("../accounts/models/clearing_periods.model");
const fees_model_1 = require("../accounts/models/fees.model");
const deposit_product_model_1 = require("../accounts/models/deposit_product.model");
const limits_durations_model_1 = require("../accounts/models/limits.durations.model");
const application_model_1 = require("../applications/application.model");
const application_form_model_1 = require("../applications/forms/application-form.model");
const application_documents_model_1 = require("../applications/documents/application-documents.model");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async createUser(createUserDto) {
        try {
            const hashedPassword = await this.hashPasswordBeforeCreate(createUserDto.password);
            return await this.userModel.create({
                email: createUserDto.email,
                password: hashedPassword,
            });
        }
        catch (err) {
            return err;
        }
    }
    async hashPasswordBeforeCreate(password) {
        if (!password)
            return password;
        const salt = await bcrypt.genSalt(10, 'a');
        const hashedPassword = bcrypt.hashSync(password, salt);
        return hashedPassword;
    }
    findAll() {
        return `This action returns all user`;
    }
    async findOne(uuid) {
        try {
            return await this.userModel.findOne({
                where: {
                    uuid,
                },
                include: [
                    {
                        model: profile_model_1.Profile,
                        include: [
                            { model: name_model_1.Name },
                            { model: residence_model_1.Residence }
                        ]
                    },
                    {
                        model: application_model_1.ApplicationModel,
                        include: [
                            { model: application_form_model_1.ApplicationFormModel },
                            { model: application_documents_model_1.ApplicationDocumentsModel }
                        ]
                    },
                    {
                        model: account_model_1.AccountModel,
                        include: [
                            {
                                model: deposit_product_model_1.DepositProductModel,
                                include: [
                                    { model: clearing_periods_model_1.ClearingPeriodsModel },
                                    { model: fees_model_1.FeesModel },
                                    {
                                        model: limits_model_1.LimitsModel,
                                        include: [
                                            { model: limits_durations_model_1.LimitsDurationModel, as: 'debit', attributes: ['daily', 'weekly', 'monthly'] },
                                            { model: limits_durations_model_1.LimitsDurationModel, as: 'credit', attributes: ['daily', 'weekly', 'monthly'] },
                                            { model: limits_durations_model_1.LimitsDurationModel, as: 'atm_withdrawl', attributes: ['daily', 'weekly', 'monthly'] },
                                            { model: limits_durations_model_1.LimitsDurationModel, as: 'deposit', attributes: ['daily', 'weekly', 'monthly'] },
                                        ]
                                    },
                                ]
                            }
                        ]
                    }
                ]
            });
        }
        catch (err) {
            return err;
        }
    }
    async findOneByEmail(email) {
        try {
            return await this.userModel.findOne({
                where: {
                    email: email
                },
                include: [
                    {
                        model: application_model_1.ApplicationModel
                    }
                ]
            });
        }
        catch (err) {
            return err;
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __metadata("design:paramtypes", [Object])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map