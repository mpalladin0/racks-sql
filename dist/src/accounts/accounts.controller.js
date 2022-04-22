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
exports.AccountsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const accounts_service_1 = require("./accounts.service");
const create_account_dto_1 = require("./dto/create-account.dto");
let AccountsController = class AccountsController {
    constructor(accountsService) {
        this.accountsService = accountsService;
    }
    async createAccount(user_uuid, createAccountDto) {
        return await this.accountsService.createAccount(user_uuid, createAccountDto);
    }
    async findAll(user_uuid) {
        return await this.accountsService.findAllByUserUUID(user_uuid);
    }
    deleteAllAccounts(user_uuid) {
        return this.accountsService.deleteAllAccountsByUserUUID(user_uuid);
    }
    deleteAccountByAccountUUID(user_uuid, account_uuid) {
        return this.accountsService.deleteAccountByAccountUUID(user_uuid, account_uuid);
    }
};
__decorate([
    (0, common_1.Post)(':user_uuid/create'),
    __param(0, (0, common_1.Param)('user_uuid')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_account_dto_1.CreateAccountDto]),
    __metadata("design:returntype", Promise)
], AccountsController.prototype, "createAccount", null);
__decorate([
    (0, common_1.Get)(':user_uuid/all'),
    __param(0, (0, common_1.Param)('user_uuid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AccountsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Delete)(':user_uuid/all/delete'),
    __param(0, (0, common_1.Param)('user_uuid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AccountsController.prototype, "deleteAllAccounts", null);
__decorate([
    (0, common_1.Delete)(':user_uuid/:account_uuid/delete'),
    __param(0, (0, common_1.Param)('user_uuid')),
    __param(1, (0, common_1.Param)('account_uuid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AccountsController.prototype, "deleteAccountByAccountUUID", null);
AccountsController = __decorate([
    (0, swagger_1.ApiTags)('accounts'),
    (0, common_1.Controller)('accounts'),
    __metadata("design:paramtypes", [accounts_service_1.AccountsService])
], AccountsController);
exports.AccountsController = AccountsController;
//# sourceMappingURL=accounts.controller.js.map