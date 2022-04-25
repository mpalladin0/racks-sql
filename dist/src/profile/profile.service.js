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
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const sequelize_1 = require("@nestjs/sequelize");
const racksbank_service_1 = require("../bank/racksbank.service");
const user_model_1 = require("../user/models/user.model");
const ProfileDeleted_event_1 = require("./events/ProfileDeleted.event");
const name_model_1 = require("./models/name.model");
const profile_model_1 = require("./models/profile.model");
const residence_model_1 = require("./models/residence.model");
let ProfileService = class ProfileService {
    constructor(eventEmitter, bank, nameModel, profileModel, userModel) {
        this.eventEmitter = eventEmitter;
        this.bank = bank;
        this.nameModel = nameModel;
        this.profileModel = profileModel;
        this.userModel = userModel;
    }
    async findOneByUserUUID(user_uuid) {
        try {
            const Profile = await this.profileModel.findOne({ where: { user_uuid }, include: [
                    { model: name_model_1.Name },
                    { model: residence_model_1.Residence }
                ] });
            if (Profile === null)
                return new common_1.HttpException({
                    error: common_1.HttpStatus.NOT_FOUND,
                    status: `User ${user_uuid} does not have a profile.`,
                }, common_1.HttpStatus.NOT_FOUND);
            return Profile;
        }
        catch (err) {
            return err.message;
        }
    }
    async findAllByUserUUID(user_uuid) {
        try {
            const Profiles = await this.profileModel.findAll({ where: { user_uuid }, include: [
                    { model: name_model_1.Name },
                    { model: residence_model_1.Residence }
                ] });
            if (Profiles.length == 0)
                return new common_1.HttpException({
                    error: common_1.HttpStatus.NOT_FOUND,
                    status: `User ${user_uuid} does not have a profile.`,
                }, common_1.HttpStatus.NOT_FOUND);
            return Profiles;
        }
        catch (err) {
            return err.message;
        }
    }
    async createProfile(user_uuid, createProfileDto) {
        try {
            const [Profile, created] = await this.profileModel.findOrCreate({
                where: { user_uuid: user_uuid },
                include: [
                    { model: name_model_1.Name },
                    { model: residence_model_1.Residence }
                ],
                defaults: {
                    user_uuid: user_uuid,
                    name: [{
                            first: createProfileDto.name.first,
                            middle: createProfileDto.name.middle,
                            last: createProfileDto.name.last,
                        }],
                    residence: [{
                            type: createProfileDto.residence.type,
                            zip_code: createProfileDto.residence.zip_code,
                            address: createProfileDto.residence.address,
                            city: createProfileDto.residence.city,
                        }]
                },
            });
            if (created)
                return Profile;
            else
                return Profile;
        }
        catch (err) {
            return err;
        }
    }
    async handleDeleteProfileEventName(payload) {
        console.log(payload);
    }
    async deleteProfileByUUID(user_uuid) {
        const Profile = await this.profileModel.findAll({
            where: { user_uuid },
        });
        Profile.forEach(async (profile) => {
            await profile.destroy();
        });
        this.eventEmitter.emit('profile.deleted', new ProfileDeleted_event_1.ProfileDeletedEvent(user_uuid));
        return Profile;
    }
    async handleProfileEvents(payload) {
        switch (payload.type) {
            case 'profile.created':
                {
                    console.log("Profile event dispatched", payload);
                }
                break;
            case 'profile.deleted':
                {
                    console.log("Profile event dispatched", payload);
                }
                break;
            default:
                return `Unknown payload type ${payload}`;
        }
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)('profile.deleted'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ProfileDeleted_event_1.ProfileDeletedEvent]),
    __metadata("design:returntype", Promise)
], ProfileService.prototype, "handleDeleteProfileEventName", null);
__decorate([
    (0, event_emitter_1.OnEvent)('profile.*'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProfileService.prototype, "handleProfileEvents", null);
ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, sequelize_1.InjectModel)(name_model_1.Name)),
    __param(3, (0, sequelize_1.InjectModel)(profile_model_1.Profile)),
    __param(4, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2,
        racksbank_service_1.RacksBank, Object, Object, Object])
], ProfileService);
exports.ProfileService = ProfileService;
//# sourceMappingURL=profile.service.js.map