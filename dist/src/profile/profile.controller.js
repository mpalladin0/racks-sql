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
exports.ProfileController = void 0;
const common_1 = require("@nestjs/common");
const profile_service_1 = require("./profile.service");
const create_profile_dto_1 = require("./dto/profile/create-profile.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const event_emitter_1 = require("@nestjs/event-emitter");
let ProfileController = class ProfileController {
    constructor(eventEmitter, profileService) {
        this.eventEmitter = eventEmitter;
        this.profileService = profileService;
    }
    findOneProfileByUserUUID(user_uuid) {
        return this.profileService.findOneByUserUUID(user_uuid);
    }
    findAllProfilesByUserUUID(user_uuid) {
        return this.profileService.findAllByUserUUID(user_uuid);
    }
    findOneProfile(user_uuid, createProfileDto) {
        return this.profileService.createProfile(user_uuid, createProfileDto);
    }
    deleteProfile(user_uuid) {
        return this.profileService.deleteProfileByUUID(user_uuid);
    }
};
__decorate([
    (0, common_1.Get)(':user_uuid'),
    __param(0, (0, common_1.Param)('user_uuid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProfileController.prototype, "findOneProfileByUserUUID", null);
__decorate([
    (0, common_1.Get)(':user_uuid/all'),
    __param(0, (0, common_1.Param)('user_uuid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProfileController.prototype, "findAllProfilesByUserUUID", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: [create_profile_dto_1.CreateProfileDto] }),
    (0, common_1.Post)(':user_uuid/create'),
    __param(0, (0, common_1.Param)('user_uuid')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_profile_dto_1.CreateProfileDto]),
    __metadata("design:returntype", void 0)
], ProfileController.prototype, "findOneProfile", null);
__decorate([
    (0, common_1.Delete)(':user_uuid/delete'),
    __param(0, (0, common_1.Param)('user_uuid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProfileController.prototype, "deleteProfile", null);
ProfileController = __decorate([
    (0, swagger_1.ApiTags)('profile'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('profile'),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2,
        profile_service_1.ProfileService])
], ProfileController);
exports.ProfileController = ProfileController;
//# sourceMappingURL=profile.controller.js.map