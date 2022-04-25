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
const application_form_model_1 = require("./forms/application-form.model");
const application_model_1 = require("./application.model");
const application_documents_model_1 = require("./documents/application-documents.model");
const residence_model_1 = require("../profile/models/residence.model");
const axios_1 = require("@nestjs/axios");
const ApplicationStatus_event_1 = require("./submitted/event/ApplicationStatus.event");
const UNIT_TOKEN = 'v2.public.eyJyb2xlIjoiYWRtaW4iLCJ1c2VySWQiOiIxNzE1Iiwic3ViIjoicGxhbnRfc2xhY2tlcjBuQGljbG91ZC5jb20iLCJleHAiOiIyMDIzLTA0LTE0VDE2OjMxOjIzLjYyOVoiLCJqdGkiOiIxMzUwOTgiLCJvcmdJZCI6Ijk5NSIsInNjb3BlIjoiYXBwbGljYXRpb25zIGFwcGxpY2F0aW9ucy13cml0ZSBjdXN0b21lcnMgY3VzdG9tZXJzLXdyaXRlIGN1c3RvbWVyLXRhZ3Mtd3JpdGUgY3VzdG9tZXItdG9rZW4td3JpdGUgYWNjb3VudHMgYWNjb3VudHMtd3JpdGUgY2FyZHMgY2FyZHMtd3JpdGUgY2FyZHMtc2Vuc2l0aXZlIGNhcmRzLXNlbnNpdGl2ZS13cml0ZSB0cmFuc2FjdGlvbnMgdHJhbnNhY3Rpb25zLXdyaXRlIGF1dGhvcml6YXRpb25zIHN0YXRlbWVudHMgcGF5bWVudHMgcGF5bWVudHMtd3JpdGUgcGF5bWVudHMtd3JpdGUtY291bnRlcnBhcnR5IHBheW1lbnRzLXdyaXRlLWFjaC1kZWJpdCBjb3VudGVycGFydGllcyBjb3VudGVycGFydGllcy13cml0ZSBiYXRjaC1yZWxlYXNlcyBiYXRjaC1yZWxlYXNlcy13cml0ZSB3ZWJob29rcyB3ZWJob29rcy13cml0ZSBldmVudHMgZXZlbnRzLXdyaXRlIGF1dGhvcml6YXRpb24tcmVxdWVzdHMgYXV0aG9yaXphdGlvbi1yZXF1ZXN0cy13cml0ZSBjaGVjay1kZXBvc2l0cyBjaGVjay1kZXBvc2l0cy13cml0ZSByZWNlaXZlZC1wYXltZW50cyByZWNlaXZlZC1wYXltZW50cy13cml0ZSBkaXNwdXRlcyBjaGFyZ2ViYWNrcyBjaGFyZ2ViYWNrcy13cml0ZSByZXdhcmRzIHJld2FyZHMtd3JpdGUiLCJvcmciOiJCb29tIiwic291cmNlSXAiOiIiLCJ1c2VyVHlwZSI6Im9yZyIsImlzVW5pdFBpbG90IjpmYWxzZX17wiw8WXgy-cwxzerOBxjD6jZDJv6YLCQK36uXEfT5vrxDOsXnBQo15Al_hvg9yL5qTY-CVbltsh_d125-A4cD';
const UNIT_API_URL = 'https://api.s.unit.sh/';
let ApplicationsService = class ApplicationsService {
    constructor(logger, httpService, eventEmitter, userModel, profileModel, applicationModel, applicationDocumentsModel, applicationFormModel) {
        this.logger = logger;
        this.httpService = httpService;
        this.eventEmitter = eventEmitter;
        this.userModel = userModel;
        this.profileModel = profileModel;
        this.applicationModel = applicationModel;
        this.applicationDocumentsModel = applicationDocumentsModel;
        this.applicationFormModel = applicationFormModel;
        this.unit = new unit_node_sdk_1.Unit(UNIT_TOKEN, UNIT_API_URL);
    }
    async createApplication(createApplicationFormDto) {
        const { user_uuid } = createApplicationFormDto;
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
                        include: [
                            { model: name_model_1.Name },
                            { model: residence_model_1.Residence }
                        ]
                    }
                ]
            });
            this.logger.warn(User.toJSON());
            const { data: { type, attributes, id } } = await this.createUnitApplicationForm(user_uuid, User.profile[0].name[0].first, User.profile[0].name[0].middle, User.profile[0].name[0].last);
            this.logger.warn(id);
            const Application = await this.applicationModel.create({
                user_uuid: user_uuid,
                form: [{
                        url: attributes.url,
                        unit_id: id,
                    }]
            }, {
                include: [
                    { model: application_form_model_1.ApplicationFormModel },
                    { model: application_documents_model_1.ApplicationDocumentsModel }
                ]
            });
            this.logger.warn(Application);
            return Application;
        }
        catch (err) {
            return err;
        }
    }
    async createUnitApplicationForm(user_uuid, first_name, middle_name, last_name) {
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
    async createApplication_Simulate(createApplicationFormSimulateDto) {
        const { user_uuid, simulation_type } = createApplicationFormSimulateDto;
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
                        include: [
                            { model: name_model_1.Name },
                            { model: residence_model_1.Residence }
                        ]
                    }
                ]
            });
            this.logger.warn(User.toJSON());
            const { data: { type, attributes, id } } = await this.createUnitApplicationForm_Simulate(user_uuid, User.profile[0].name[0].first, User.profile[0].name[0].middle, User.profile[0].name[0].last, simulation_type);
            const Application = await this.applicationModel.create({
                user_uuid: user_uuid,
                form: [{
                        url: attributes.url,
                        unit_id: id,
                    }]
            }, {
                include: [
                    { model: application_form_model_1.ApplicationFormModel },
                    { model: application_documents_model_1.ApplicationDocumentsModel }
                ]
            });
            this.logger.warn(Application);
            return Application;
        }
        catch (err) {
            return err;
        }
    }
    async simulate_ApplicationEvent(simulateApplicationEventDto) {
        const UNIT_BEARER_TOKEN = 'v2.public.eyJyb2xlIjoiYWRtaW4iLCJ1c2VySWQiOiIxNzE1Iiwic3ViIjoicGxhbnRfc2xhY2tlcjBuQGljbG91ZC5jb20iLCJleHAiOiIyMDIzLTA0LTIzVDIyOjU5OjU2LjkzMloiLCJqdGkiOiIxMzcyMzgiLCJvcmdJZCI6Ijk5NSIsInNjb3BlIjoiYXBwbGljYXRpb25zIGFwcGxpY2F0aW9ucy13cml0ZSBjdXN0b21lcnMgY3VzdG9tZXJzLXdyaXRlIGN1c3RvbWVyLXRhZ3Mtd3JpdGUgY3VzdG9tZXItdG9rZW4td3JpdGUgYWNjb3VudHMgYWNjb3VudHMtd3JpdGUgY2FyZHMgY2FyZHMtd3JpdGUgY2FyZHMtc2Vuc2l0aXZlIGNhcmRzLXNlbnNpdGl2ZS13cml0ZSB0cmFuc2FjdGlvbnMgdHJhbnNhY3Rpb25zLXdyaXRlIGF1dGhvcml6YXRpb25zIHN0YXRlbWVudHMgcGF5bWVudHMgcGF5bWVudHMtd3JpdGUgcGF5bWVudHMtd3JpdGUtY291bnRlcnBhcnR5IHBheW1lbnRzLXdyaXRlLWFjaC1kZWJpdCBjb3VudGVycGFydGllcyBjb3VudGVycGFydGllcy13cml0ZSBiYXRjaC1yZWxlYXNlcyBiYXRjaC1yZWxlYXNlcy13cml0ZSB3ZWJob29rcyB3ZWJob29rcy13cml0ZSBldmVudHMgZXZlbnRzLXdyaXRlIGF1dGhvcml6YXRpb24tcmVxdWVzdHMgYXV0aG9yaXphdGlvbi1yZXF1ZXN0cy13cml0ZSBjaGVjay1kZXBvc2l0cyBjaGVjay1kZXBvc2l0cy13cml0ZSByZWNlaXZlZC1wYXltZW50cyByZWNlaXZlZC1wYXltZW50cy13cml0ZSBkaXNwdXRlcyBjaGFyZ2ViYWNrcyBjaGFyZ2ViYWNrcy13cml0ZSByZXdhcmRzIHJld2FyZHMtd3JpdGUiLCJvcmciOiJCb29tIiwic291cmNlSXAiOiIiLCJ1c2VyVHlwZSI6Im9yZyIsImlzVW5pdFBpbG90IjpmYWxzZX1-zJNMdR6Haj234D1CzBUSRIb18EoR3ZHMxruFI37yjj4-hdRG-_cWsIMBRHt9w1BPBOYdMlx217Sk7V0CcToN';
        this.logger.warn('Simulating Application ', simulateApplicationEventDto.simulation_type, ' Event');
        const { simulation_type, user_uuid } = simulateApplicationEventDto;
        const UnitApplications = await this.unit.applications.list({ tags: { internal_user_uuid: user_uuid } });
        const User = await this.userModel.findOne({
            where: { uuid: user_uuid },
            include: [
                { model: application_model_1.ApplicationModel }
            ]
        });
        UnitApplications.data.forEach(async (application) => {
            switch (simulation_type) {
                case 'Approve':
                    {
                        const UNIT_URL = `https://api.s.unit.sh/sandbox/applications/${application.id}/approve`;
                        const AxiosResponse = await this.httpService.axiosRef.post(UNIT_URL, { data: { type: "applicationApprove", attributes: { reason: "sandbox" } } }, {
                            headers: {
                                'Content-Type': 'application/vnd.api+json',
                                'Authorization': `Bearer ${UNIT_TOKEN}`,
                            }
                        });
                        const UnitResponse = AxiosResponse.data.data;
                        console.log(UnitResponse);
                        console.log("Finding Applcation.....", application.id);
                        const UserApplications = await this.applicationModel.findAll({
                            where: { user_uuid: user_uuid },
                            include: [
                                { model: application_form_model_1.ApplicationFormModel }
                            ]
                        });
                        UserApplications.forEach(async (application) => {
                            try {
                                if (application.form.unit_id === UnitResponse.relationships.applicationForm.data.id) {
                                    console.log('MATCH FOUND');
                                    application.status = UnitResponse.status;
                                    application.form.status = UnitResponse.status;
                                    await application.form.save();
                                    await application.save();
                                    const unit_customer_id = UnitResponse.relationships.customer.data.id;
                                    User.unit_id = unit_customer_id;
                                    await User.save();
                                    application.setAttributes('unit_customer_id', unit_customer_id);
                                    application.user.setAttributes('unit_id', unit_customer_id);
                                    await application.user.save();
                                    await application.save();
                                }
                            }
                            catch (err) { }
                        });
                        return UserApplications;
                    }
                    break;
                case 'Deny':
                    break;
                default:
                    throw new Error(`Unknown simulation type ${simulation_type}`);
            }
        });
    }
    async createUnitApplicationForm_Simulate(user_uuid, first_name, middle_name, last_name, simulation_type) {
        let ssn = null;
        switch (simulation_type) {
            case 'PendingReview':
                ssn = '000000004';
                break;
            case 'AwaitingDocuments':
                ssn = '000000003';
                break;
            case 'Denied':
                ssn = '000000001';
                break;
            default:
                throw new Error(`Unknown simulation type ${simulation_type}`);
        }
        const applicationFormRequest = {
            type: 'applicationForm',
            attributes: {
                applicantDetails: {
                    "ssn": ssn,
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
    async findAllSubmitted_by_UserUUID_from_Unit(user_uuid) {
        const UnitApplications = await this.unit.applications.list({
            tags: {
                internal_user_uuid: user_uuid
            }
        });
        UnitApplications.data.forEach(application => {
            const status = application.attributes.status;
            this.eventEmitter.emit('application.status.refresh', new ApplicationStatus_event_1.ApplicationStatusEvent(status, user_uuid));
        });
    }
    async findOne_by_ApplicationFormUUID(application_form_uuid) {
        try {
            const ApplicationForm = await this.applicationFormModel.findOne({
                where: { application_form_uuid: application_form_uuid }
            });
            if (ApplicationForm)
                return ApplicationForm;
            else
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.NOT_FOUND,
                    error: `Application Form ${application_form_uuid} not found.`,
                }, common_1.HttpStatus.NOT_FOUND);
        }
        catch (err) {
            return err;
        }
    }
    async findOne_by_ApplicationUUID(application_uuid) {
        try {
            const Application = await this.applicationModel.findOne({
                where: {
                    application_uuid: application_uuid
                }
            });
            if (Application)
                return Application;
            else
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.NOT_FOUND,
                    error: `Application ${application_uuid} not found.`,
                }, common_1.HttpStatus.NOT_FOUND);
        }
        catch (err) {
            return err;
        }
    }
    async findAll_Applications_by_UserUUID(user_uuid) {
        const Applications = await this.applicationModel.findAll({
            where: { user_uuid: user_uuid },
            include: [
                { model: application_form_model_1.ApplicationFormModel },
                { model: application_documents_model_1.ApplicationDocumentsModel }
            ]
        });
        if (Applications.length == 0)
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: `User ${user_uuid} has no applications.`
            }, common_1.HttpStatus.NOT_FOUND);
        return Applications;
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
    async handleApplcationStatusEvent(payload) {
        const { status, user_uuid } = payload;
        this.logger.warn("Yooo", status);
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)('application.status.refresh'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ApplicationStatus_event_1.ApplicationStatusEvent]),
    __metadata("design:returntype", Promise)
], ApplicationsService.prototype, "handleApplcationStatusEvent", null);
ApplicationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __param(4, (0, sequelize_1.InjectModel)(profile_model_1.Profile)),
    __param(5, (0, sequelize_1.InjectModel)(application_model_1.ApplicationModel)),
    __param(6, (0, sequelize_1.InjectModel)(application_documents_model_1.ApplicationDocumentsModel)),
    __param(7, (0, sequelize_1.InjectModel)(application_form_model_1.ApplicationFormModel)),
    __metadata("design:paramtypes", [common_1.Logger,
        axios_1.HttpService,
        event_emitter_1.EventEmitter2, Object, Object, Object, Object, Object])
], ApplicationsService);
exports.ApplicationsService = ApplicationsService;
//# sourceMappingURL=applications.service.js.map