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
exports.ApplicationsService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const sequelize_1 = require("@nestjs/sequelize");
const unit_node_sdk_1 = require("@unit-finance/unit-node-sdk");
const name_model_1 = require("../profile/models/name.model");
const profile_model_1 = require("../profile/models/profile.model");
const user_model_1 = require("../user/models/user.model");
const ApplicationRefreshStatus_event_1 = require("./event/ApplicationRefreshStatus.event");
const application_model_1 = require("./models/application.model");
const UNIT_TOKEN = 'v2.public.eyJyb2xlIjoiYWRtaW4iLCJ1c2VySWQiOiIxNzE1Iiwic3ViIjoicGxhbnRfc2xhY2tlcjBuQGljbG91ZC5jb20iLCJleHAiOiIyMDIzLTA0LTE0VDE2OjMxOjIzLjYyOVoiLCJqdGkiOiIxMzUwOTgiLCJvcmdJZCI6Ijk5NSIsInNjb3BlIjoiYXBwbGljYXRpb25zIGFwcGxpY2F0aW9ucy13cml0ZSBjdXN0b21lcnMgY3VzdG9tZXJzLXdyaXRlIGN1c3RvbWVyLXRhZ3Mtd3JpdGUgY3VzdG9tZXItdG9rZW4td3JpdGUgYWNjb3VudHMgYWNjb3VudHMtd3JpdGUgY2FyZHMgY2FyZHMtd3JpdGUgY2FyZHMtc2Vuc2l0aXZlIGNhcmRzLXNlbnNpdGl2ZS13cml0ZSB0cmFuc2FjdGlvbnMgdHJhbnNhY3Rpb25zLXdyaXRlIGF1dGhvcml6YXRpb25zIHN0YXRlbWVudHMgcGF5bWVudHMgcGF5bWVudHMtd3JpdGUgcGF5bWVudHMtd3JpdGUtY291bnRlcnBhcnR5IHBheW1lbnRzLXdyaXRlLWFjaC1kZWJpdCBjb3VudGVycGFydGllcyBjb3VudGVycGFydGllcy13cml0ZSBiYXRjaC1yZWxlYXNlcyBiYXRjaC1yZWxlYXNlcy13cml0ZSB3ZWJob29rcyB3ZWJob29rcy13cml0ZSBldmVudHMgZXZlbnRzLXdyaXRlIGF1dGhvcml6YXRpb24tcmVxdWVzdHMgYXV0aG9yaXphdGlvbi1yZXF1ZXN0cy13cml0ZSBjaGVjay1kZXBvc2l0cyBjaGVjay1kZXBvc2l0cy13cml0ZSByZWNlaXZlZC1wYXltZW50cyByZWNlaXZlZC1wYXltZW50cy13cml0ZSBkaXNwdXRlcyBjaGFyZ2ViYWNrcyBjaGFyZ2ViYWNrcy13cml0ZSByZXdhcmRzIHJld2FyZHMtd3JpdGUiLCJvcmciOiJCb29tIiwic291cmNlSXAiOiIiLCJ1c2VyVHlwZSI6Im9yZyIsImlzVW5pdFBpbG90IjpmYWxzZX17wiw8WXgy-cwxzerOBxjD6jZDJv6YLCQK36uXEfT5vrxDOsXnBQo15Al_hvg9yL5qTY-CVbltsh_d125-A4cD';
const UNIT_API_URL = 'https://api.s.unit.sh/';
let ApplicationsService = class ApplicationsService {
    constructor(userModel, profileModel, applicationModel) {
        this.userModel = userModel;
        this.profileModel = profileModel;
        this.applicationModel = applicationModel;
        this.unit = new unit_node_sdk_1.Unit(UNIT_TOKEN, UNIT_API_URL);
    }
    async createApplication(createApplicationDto) {
        const { user_uuid } = createApplicationDto;
        try {
            const Profile = await this.profileModel.findOne({ where: { user_uuid: user_uuid } });
            if (Profile === null) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.NOT_FOUND,
                    error: 'User profile must be created before creating an application',
                }, common_1.HttpStatus.NOT_FOUND);
            }
        }
        catch (err) {
            return err;
        }
        try {
            const User = await this.userModel.findOne({
                where: { uuid: user_uuid },
                include: [
                    {
                        model: profile_model_1.Profile,
                        include: [name_model_1.Name]
                    }
                ]
            });
            const { data: { type, attributes, id } } = await this.createUnitApplication(user_uuid, User.profile[0].name[0].first, User.profile[0].name[0].middle, User.profile[0].name[0].last);
            const Application = await this.applicationModel.create({
                url: attributes.url,
                unit_id: id
            });
            await User.$add('applications', Application);
            await User.save();
            return Application;
        }
        catch (err) {
            return err;
        }
    }
    async createUnitApplication(user_uuid, first_name, middle_name, last_name) {
        const applicationFormRequest = {
            type: 'applicationForm',
            attributes: {
                applicantDetails: {
                    "ssn": "000000002",
                    "fullName": this.unit.helpers.createFullName(first_name, last_name),
                    "dateOfBirth": "2001-08-10",
                    "address": this.unit.helpers.createAddress("20 Ingram St", null, "Forest Hills", "CA", "11375", "US"),
                    "email": "april@baxter.com",
                    "phone": this.unit.helpers.createPhone("1", "2025550158"),
                    "ein": "123456789",
                    "dba": "Pied Piper Inc",
                },
                tags: {
                    "internal_user_uuid": user_uuid
                }
            },
        };
        try {
            return await this.unit.applicationForms.create(applicationFormRequest);
        }
        catch (err) {
            return err;
        }
    }
    async findAllApplicationsByUserUUID(user_uuid) {
        return await this.applicationModel.findAll({
            where: {
                user_uuid: user_uuid
            }
        });
    }
    async findOneByApplicationUUID(application_uuid) {
        try {
            const application = await this.applicationModel.findOne({
                where: {
                    application_uuid
                }
            });
            if (application)
                return application;
            else
                return `Application ${application_uuid} could not be found.`;
        }
        catch (err) {
            return err;
        }
    }
    async setUnitIDForUser(user_uuid) {
        const user = await this.userModel.findOne({ where: { uuid: user_uuid } });
        const response = await this.unit.applications.get('360995');
        const unit_id = response.data.relationships.customer.data.id;
        try {
            await user.$set('unit_id', unit_id);
            return user;
        }
        catch (err) {
            return err;
        }
    }
    async refreshApplicationStatus(event) {
        const Applications = await this.applicationModel.findAll({ where: { user_uuid: event.user_uuid } });
        Applications.forEach(async (application_form) => {
            const { status } = application_form;
            switch (status) {
                case 'pending':
                    console.log(application_form.unit_id);
                    const { data } = await this.unit.applicationForms.get(application_form.unit_id);
                    console.log(data.attributes.stage);
                    break;
                case 'pending_review':
                    break;
                case 'approved':
                    break;
                case 'denied':
                    break;
                case 'awaiting_documents':
                    break;
                default:
                    return new Error(`Unknown status ${status}`);
            }
        });
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)('applications.status.refresh'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ApplicationRefreshStatus_event_1.ApplicationRefreshStatusEvent]),
    __metadata("design:returntype", Promise)
], ApplicationsService.prototype, "refreshApplicationStatus", null);
ApplicationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __param(1, (0, sequelize_1.InjectModel)(profile_model_1.Profile)),
    __param(2, (0, sequelize_1.InjectModel)(application_model_1.Application)),
    __metadata("design:paramtypes", [Object, Object, Object])
], ApplicationsService);
exports.ApplicationsService = ApplicationsService;
//# sourceMappingURL=applications.service.js.map