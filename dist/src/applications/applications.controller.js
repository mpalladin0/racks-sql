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
const create_application_dto_1 = require("./dto/create-application.dto");
const application_model_1 = require("./models/application.model");
let ApplicationsController = class ApplicationsController {
    constructor(applicationsService) {
        this.applicationsService = applicationsService;
        this.unit = new unit_node_sdk_1.Unit(secrets_constants_1.UNIT_API_TOKEN, secrets_constants_1.UNTI_API_ENDPOINT_URL);
    }
    create(createApplicationDto) {
        return this.applicationsService.createApplication(createApplicationDto);
    }
    findOneByApplicationUUID(application_uuid) {
        return this.applicationsService.findOneByApplicationUUID(application_uuid);
    }
    async findAllForUser(user_uuid) {
        await this.applicationsService.setUnitIDForUser(user_uuid);
        return this.applicationsService.findAllApplicationsByUserUUID(user_uuid);
    }
    async webhook(payload) {
        payload.data.forEach(response => {
            switch (response.type) {
                case 'customer.updated':
                    {
                        const res = response;
                        console.log("Customer updated...", res.data.attributes.changes);
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
    (0, swagger_1.ApiBody)({ type: [create_application_dto_1.CreateApplicationDto] }),
    (0, common_1.Post)('create'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'The application has been successfully created.',
        type: application_model_1.Application.name,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_application_dto_1.CreateApplicationDto]),
    __metadata("design:returntype", void 0)
], ApplicationsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':application_uuid'),
    __param(0, (0, common_1.Param)('application_uuid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ApplicationsController.prototype, "findOneByApplicationUUID", null);
__decorate([
    (0, common_1.Get)(':user_uuid/all'),
    __param(0, (0, common_1.Param)('user_uuid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApplicationsController.prototype, "findAllForUser", null);
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
    __metadata("design:paramtypes", [applications_service_1.ApplicationsService])
], ApplicationsController);
exports.ApplicationsController = ApplicationsController;
//# sourceMappingURL=applications.controller.js.map