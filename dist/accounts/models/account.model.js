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
exports.AccountModel = void 0;
const event_emitter_1 = require("@nestjs/event-emitter");
const unit_node_sdk_1 = require("@unit-finance/unit-node-sdk");
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const user_model_1 = require("../../user/models/user.model");
const deposit_product_model_1 = require("./deposit_product.model");
const UNIT_TOKEN = 'v2.public.eyJyb2xlIjoiYWRtaW4iLCJ1c2VySWQiOiIxNzE1Iiwic3ViIjoicGxhbnRfc2xhY2tlcjBuQGljbG91ZC5jb20iLCJleHAiOiIyMDIzLTA0LTE0VDE2OjMxOjIzLjYyOVoiLCJqdGkiOiIxMzUwOTgiLCJvcmdJZCI6Ijk5NSIsInNjb3BlIjoiYXBwbGljYXRpb25zIGFwcGxpY2F0aW9ucy13cml0ZSBjdXN0b21lcnMgY3VzdG9tZXJzLXdyaXRlIGN1c3RvbWVyLXRhZ3Mtd3JpdGUgY3VzdG9tZXItdG9rZW4td3JpdGUgYWNjb3VudHMgYWNjb3VudHMtd3JpdGUgY2FyZHMgY2FyZHMtd3JpdGUgY2FyZHMtc2Vuc2l0aXZlIGNhcmRzLXNlbnNpdGl2ZS13cml0ZSB0cmFuc2FjdGlvbnMgdHJhbnNhY3Rpb25zLXdyaXRlIGF1dGhvcml6YXRpb25zIHN0YXRlbWVudHMgcGF5bWVudHMgcGF5bWVudHMtd3JpdGUgcGF5bWVudHMtd3JpdGUtY291bnRlcnBhcnR5IHBheW1lbnRzLXdyaXRlLWFjaC1kZWJpdCBjb3VudGVycGFydGllcyBjb3VudGVycGFydGllcy13cml0ZSBiYXRjaC1yZWxlYXNlcyBiYXRjaC1yZWxlYXNlcy13cml0ZSB3ZWJob29rcyB3ZWJob29rcy13cml0ZSBldmVudHMgZXZlbnRzLXdyaXRlIGF1dGhvcml6YXRpb24tcmVxdWVzdHMgYXV0aG9yaXphdGlvbi1yZXF1ZXN0cy13cml0ZSBjaGVjay1kZXBvc2l0cyBjaGVjay1kZXBvc2l0cy13cml0ZSByZWNlaXZlZC1wYXltZW50cyByZWNlaXZlZC1wYXltZW50cy13cml0ZSBkaXNwdXRlcyBjaGFyZ2ViYWNrcyBjaGFyZ2ViYWNrcy13cml0ZSByZXdhcmRzIHJld2FyZHMtd3JpdGUiLCJvcmciOiJCb29tIiwic291cmNlSXAiOiIiLCJ1c2VyVHlwZSI6Im9yZyIsImlzVW5pdFBpbG90IjpmYWxzZX17wiw8WXgy-cwxzerOBxjD6jZDJv6YLCQK36uXEfT5vrxDOsXnBQo15Al_hvg9yL5qTY-CVbltsh_d125-A4cD';
const UNIT_API_URL = 'https://api.s.unit.sh/';
let AccountModel = class AccountModel extends sequelize_typescript_1.Model {
    static async fetchStatus(Account) {
        console.log("Refreshing status...");
        console.log(" GETTING THE STATUS FOR ", Account.status);
    }
};
AccountModel.unit = new unit_node_sdk_1.Unit(UNIT_TOKEN, UNIT_API_URL);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.UUID, defaultValue: sequelize_2.UUIDV4, primaryKey: true, }),
    __metadata("design:type", String)
], AccountModel.prototype, "account_uuid", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    __metadata("design:type", String)
], AccountModel.prototype, "user_uuid", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.User, 'user_uuid'),
    __metadata("design:type", user_model_1.User)
], AccountModel.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => deposit_product_model_1.DepositProductModel),
    __metadata("design:type", Array)
], AccountModel.prototype, "deposit_product", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
        defaultValue: "PENDING",
        type: sequelize_typescript_1.DataType.STRING,
        get: function () { return this.getDataValue('status'); },
        set: function (value) { this.setDataValue('status', value); }
    }),
    __metadata("design:type", String)
], AccountModel.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: false, defaultValue: "USD" }),
    __metadata("design:type", String)
], AccountModel.prototype, "currency", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], AccountModel.prototype, "balance", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], AccountModel.prototype, "hold", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: false, defaultValue: 0 }),
    __metadata("design:type", Number)
], AccountModel.prototype, "available", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: false, defaultValue: "" }),
    __metadata("design:type", String)
], AccountModel.prototype, "routing_number", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: false, defaultValue: "" }),
    __metadata("design:type", String)
], AccountModel.prototype, "account_number", void 0);
__decorate([
    (0, event_emitter_1.OnEvent)('account.status.refresh'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AccountModel]),
    __metadata("design:returntype", Promise)
], AccountModel, "fetchStatus", null);
AccountModel = __decorate([
    sequelize_typescript_1.Table
], AccountModel);
exports.AccountModel = AccountModel;
//# sourceMappingURL=account.model.js.map