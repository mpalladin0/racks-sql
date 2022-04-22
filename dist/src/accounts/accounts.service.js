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
exports.AccountsService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const sequelize_1 = require("@nestjs/sequelize");
const account_model_1 = require("./models/account.model");
const clearing_periods_model_1 = require("./models/clearing_periods.model");
const deposit_product_model_1 = require("./models/deposit_product.model");
const fees_model_1 = require("./models/fees.model");
const limits_durations_model_1 = require("./models/limits.durations.model");
const limits_model_1 = require("./models/limits.model");
let AccountsService = class AccountsService {
    constructor(eventEmitter, accountModel) {
        this.eventEmitter = eventEmitter;
        this.accountModel = accountModel;
    }
    async createAccount(user_uuid, createAccountDto) {
        try {
            const [Account, created] = await this.accountModel.findOrCreate({
                where: { user_uuid: user_uuid },
                include: [
                    {
                        model: deposit_product_model_1.DepositProductModel,
                        include: [
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
                            { model: clearing_periods_model_1.ClearingPeriodsModel }
                        ]
                    }
                ],
                defaults: {
                    user_uuid: user_uuid,
                    deposit_product: [{
                            purpose: createAccountDto.deposit_product.purpose,
                            tier: createAccountDto.deposit_product.tier,
                            fees: [{
                                    ach_transfer: 1.25,
                                    atm_in_network: 1.25,
                                    atm_out_network: 1.25,
                                }],
                            limits: [{
                                    debit: [{
                                            daily: 300,
                                            weekly: 2100,
                                            monthly: 8400,
                                        }],
                                    credit: [{
                                            daily: 300,
                                            weekly: 2100,
                                            monthly: 8400,
                                        }],
                                    atm_withdrawl: [{
                                            daily: 300,
                                            weekly: 2100,
                                            monthly: 8400,
                                        }],
                                    deposit: [{
                                            daily: 300,
                                            weekly: 2100,
                                            monthly: 8400,
                                        }],
                                }]
                        }],
                },
            });
            if (created)
                return Account;
            else
                return Account;
        }
        catch (err) {
            return err;
        }
    }
    async findAllByUserUUID(user_uuid) {
        try {
            return await this.accountModel.findAll({ where: { user_uuid: user_uuid }, include: [
                    {
                        model: deposit_product_model_1.DepositProductModel,
                        include: [
                            { model: fees_model_1.FeesModel },
                            {
                                model: limits_model_1.LimitsModel,
                                include: [
                                    { model: limits_durations_model_1.LimitsDurationModel, as: 'debit', attributes: ['daily', 'weekly', 'monthly'] },
                                    { model: limits_durations_model_1.LimitsDurationModel, as: 'credit', attributes: ['daily', 'weekly', 'monthly'] },
                                    { model: limits_durations_model_1.LimitsDurationModel, as: 'deposit', attributes: ['daily', 'weekly', 'monthly'] },
                                    { model: limits_durations_model_1.LimitsDurationModel, as: 'atm_withdrawl', attributes: ['daily', 'weekly', 'monthly'] },
                                ]
                            },
                            { model: clearing_periods_model_1.ClearingPeriodsModel }
                        ]
                    }
                ] });
        }
        catch (err) {
            return err.message;
        }
    }
    async deleteAllAccountsByUserUUID(user_uuid) {
        const Accounts = await this.accountModel.findAll({
            where: { user_uuid },
        });
        Accounts.forEach(async (account) => {
            await account.destroy();
        });
        return Accounts;
    }
    async deleteAccountByAccountUUID(user_uuid, account_uuid) {
        try {
            await this.accountModel.destroy({
                where: {
                    user_uuid: user_uuid,
                    account_uuid: account_uuid
                }
            });
        }
        catch (err) {
            return err;
        }
    }
    async handleAccountStatusEvents() {
        console.log("Checking account status..");
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)('account.status.*'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AccountsService.prototype, "handleAccountStatusEvents", null);
AccountsService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, sequelize_1.InjectModel)(account_model_1.AccountModel)),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2, Object])
], AccountsService);
exports.AccountsService = AccountsService;
//# sourceMappingURL=accounts.service.js.map