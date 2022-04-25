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
const unit_node_sdk_1 = require("@unit-finance/unit-node-sdk");
const user_model_1 = require("../user/models/user.model");
const account_model_1 = require("./models/account.model");
const clearing_periods_model_1 = require("./models/clearing_periods.model");
const deposit_product_model_1 = require("./models/deposit_product.model");
const fees_model_1 = require("./models/fees.model");
const limits_durations_model_1 = require("./models/limits.durations.model");
const limits_model_1 = require("./models/limits.model");
const UNIT_TOKEN = 'v2.public.eyJyb2xlIjoiYWRtaW4iLCJ1c2VySWQiOiIxNzE1Iiwic3ViIjoicGxhbnRfc2xhY2tlcjBuQGljbG91ZC5jb20iLCJleHAiOiIyMDIzLTA0LTE0VDE2OjMxOjIzLjYyOVoiLCJqdGkiOiIxMzUwOTgiLCJvcmdJZCI6Ijk5NSIsInNjb3BlIjoiYXBwbGljYXRpb25zIGFwcGxpY2F0aW9ucy13cml0ZSBjdXN0b21lcnMgY3VzdG9tZXJzLXdyaXRlIGN1c3RvbWVyLXRhZ3Mtd3JpdGUgY3VzdG9tZXItdG9rZW4td3JpdGUgYWNjb3VudHMgYWNjb3VudHMtd3JpdGUgY2FyZHMgY2FyZHMtd3JpdGUgY2FyZHMtc2Vuc2l0aXZlIGNhcmRzLXNlbnNpdGl2ZS13cml0ZSB0cmFuc2FjdGlvbnMgdHJhbnNhY3Rpb25zLXdyaXRlIGF1dGhvcml6YXRpb25zIHN0YXRlbWVudHMgcGF5bWVudHMgcGF5bWVudHMtd3JpdGUgcGF5bWVudHMtd3JpdGUtY291bnRlcnBhcnR5IHBheW1lbnRzLXdyaXRlLWFjaC1kZWJpdCBjb3VudGVycGFydGllcyBjb3VudGVycGFydGllcy13cml0ZSBiYXRjaC1yZWxlYXNlcyBiYXRjaC1yZWxlYXNlcy13cml0ZSB3ZWJob29rcyB3ZWJob29rcy13cml0ZSBldmVudHMgZXZlbnRzLXdyaXRlIGF1dGhvcml6YXRpb24tcmVxdWVzdHMgYXV0aG9yaXphdGlvbi1yZXF1ZXN0cy13cml0ZSBjaGVjay1kZXBvc2l0cyBjaGVjay1kZXBvc2l0cy13cml0ZSByZWNlaXZlZC1wYXltZW50cyByZWNlaXZlZC1wYXltZW50cy13cml0ZSBkaXNwdXRlcyBjaGFyZ2ViYWNrcyBjaGFyZ2ViYWNrcy13cml0ZSByZXdhcmRzIHJld2FyZHMtd3JpdGUiLCJvcmciOiJCb29tIiwic291cmNlSXAiOiIiLCJ1c2VyVHlwZSI6Im9yZyIsImlzVW5pdFBpbG90IjpmYWxzZX17wiw8WXgy-cwxzerOBxjD6jZDJv6YLCQK36uXEfT5vrxDOsXnBQo15Al_hvg9yL5qTY-CVbltsh_d125-A4cD';
const UNIT_API_URL = 'https://api.s.unit.sh/';
let AccountsService = class AccountsService {
    constructor(eventEmitter, userModel, accountModel) {
        this.eventEmitter = eventEmitter;
        this.userModel = userModel;
        this.accountModel = accountModel;
        this.unit = new unit_node_sdk_1.Unit(UNIT_TOKEN, UNIT_API_URL);
    }
    async createAccount(user_uuid, createAccountDto) {
        const User = await this.userModel.findOne({ where: { uuid: user_uuid } });
        const UnitAccount = await this.unit.accounts.create({
            attributes: {
                depositProduct: "checking",
            },
            relationships: {
                customer: {
                    data: {
                        id: User.unit_id.toString(),
                        type: "customer"
                    }
                }
            },
            type: 'depositAccount',
        });
        console.log(UnitAccount);
        try {
            const UNIT_ROUTING_NUMBER = UnitAccount.data.attributes.routingNumber.toString();
            const UNIT_ACCOUNT_NUMBER = UnitAccount.data.attributes.accountNumber.toString();
            console.log(UNIT_ROUTING_NUMBER, UNIT_ACCOUNT_NUMBER);
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
                            routing_number: UNIT_ROUTING_NUMBER,
                            account_number: UNIT_ACCOUNT_NUMBER,
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
            Account.$set('account_number', UNIT_ACCOUNT_NUMBER);
            Account.$set("routing_number", UNIT_ROUTING_NUMBER);
            await Account.save();
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
    __param(1, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __param(2, (0, sequelize_1.InjectModel)(account_model_1.AccountModel)),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2, Object, Object])
], AccountsService);
exports.AccountsService = AccountsService;
//# sourceMappingURL=accounts.service.js.map