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
exports.ApplicationsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const unit_node_sdk_1 = require("@unit-finance/unit-node-sdk");
const secrets_constants_1 = require("../../secrets/secrets.constants");
const applications_service_1 = require("./applications.service");
const create_application_form_dto_1 = require("./forms/dto/create-application-form.dto");
const application_model_1 = require("./application.model");
const create_application_form_simulate_dto_1 = require("./forms/dto/create-application-form-simulate.dto");
const simulate_application_event_dto_1 = require("./submitted/dto/simulate-application-event.dto");
let ApplicationsController = class ApplicationsController {
    constructor(logger, applicationsService) {
        this.logger = logger;
        this.applicationsService = applicationsService;
        this.unit = new unit_node_sdk_1.Unit(secrets_constants_1.UNIT_API_TOKEN, secrets_constants_1.UNTI_API_ENDPOINT_URL);
    }
    createApplicationForm(createApplicationForm) {
        return this.applicationsService.createApplication(createApplicationForm);
    }
    createApplication_Simulate(createApplicationFormSimulation) {
        return this.applicationsService.createApplication_Simulate(createApplicationFormSimulation);
    }
    simulateApplicationEvent(simulateApplicationEveneDto) {
        return this.applicationsService.simulate_ApplicationEvent(simulateApplicationEveneDto);
    }
    findOneByApplicationUUID(application_uuid) {
        return this.applicationsService.findOne_by_ApplicationUUID(application_uuid);
    }
    async findAllSubmittedUser(user_uuid) {
        return this.applicationsService.findAllSubmitted_by_UserUUID_from_Unit(user_uuid);
    }
    async webhook(payload) {
        payload.data.forEach(response => {
            switch (response.type) {
                case 'application.denied':
                    {
                        const res = response;
                        console.log("New denied created", res);
                    }
                    break;
                case 'application.awaitingDocuments':
                    {
                        const res = response;
                        console.log("New awaitingDocuments created", res);
                    }
                    break;
                case 'application.pendingReview':
                    {
                        const res = response;
                        console.log("New pendingReview", res);
                    }
                    break;
                case 'customer.created':
                    {
                        const res = response;
                        console.log("New customer created", res);
                    }
                    break;
                default:
                    throw new Error("Unknown type" + response.type);
            }
        });
    }
};
__decorate([
    (0, swagger_1.ApiBody)({ type: [create_application_form_dto_1.CreateApplicationFormDto] }),
    (0, common_1.Post)('create'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'The application form has been successfully created.',
        type: application_model_1.ApplicationModel.name,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_application_form_dto_1.CreateApplicationFormDto]),
    __metadata("design:returntype", void 0)
], ApplicationsController.prototype, "createApplicationForm", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: [create_application_form_dto_1.CreateApplicationFormDto] }),
    (0, common_1.Post)('create/simulate'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'The application form has been successfully created.',
        type: application_model_1.ApplicationModel.name,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_application_form_simulate_dto_1.CreateApplicationFormSimulationDto]),
    __metadata("design:returntype", void 0)
], ApplicationsController.prototype, "createApplication_Simulate", null);
__decorate([
    (0, common_1.Post)('simulate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [simulate_application_event_dto_1.SimulateApplicationEventDto]),
    __metadata("design:returntype", void 0)
], ApplicationsController.prototype, "simulateApplicationEvent", null);
__decorate([
    (0, common_1.Get)(':application_uuid'),
    __param(0, (0, common_1.Param)('application_uuid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ApplicationsController.prototype, "findOneByApplicationUUID", null);
__decorate([
    (0, common_1.Get)(':user_uuid/submitted/all'),
    __param(0, (0, common_1.Param)('user_uuid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApplicationsController.prototype, "findAllSubmittedUser", null);
__decorate([
    (0, common_1.Post)('webhook'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ApplicationsController.prototype, "webhook", null);
ApplicationsController = __decorate([
    (0, swagger_1.ApiTags)('applications'),
    (0, common_1.Controller)('applications'),
    __metadata("design:paramtypes", [common_1.Logger,
        applications_service_1.ApplicationsService])
], ApplicationsController);
exports.ApplicationsController = ApplicationsController;
//# sourceMappingURL=applications.controller.js.map