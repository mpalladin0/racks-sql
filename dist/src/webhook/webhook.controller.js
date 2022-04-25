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
exports.WebhookController = void 0;
const common_1 = require("@nestjs/common");
const webhook_service_1 = require("./webhook.service");
const update_webhook_dto_1 = require("./dto/update-webhook.dto");
const event_emitter_1 = require("@nestjs/event-emitter");
const UnitEvent_racks_event_1 = require("../bank/event/UnitEvent.racks.event");
let WebhookController = class WebhookController {
    constructor(eventEmitter, webhookService) {
        this.eventEmitter = eventEmitter;
        this.webhookService = webhookService;
    }
    create(payload) {
        const { data } = payload;
        data.forEach(event => {
            const { attributes, id, type, relationships } = event;
            this.eventEmitter.emit('unit', new UnitEvent_racks_event_1.UnitEventRacks(attributes, id, type, relationships));
        });
        return this.webhookService.create(payload);
    }
    findAll() {
        return this.webhookService.findAll();
    }
    findOne(id) {
        return this.webhookService.findOne(+id);
    }
    update(id, updateWebhookDto) {
        return this.webhookService.update(+id, updateWebhookDto);
    }
    remove(id) {
        return this.webhookService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WebhookController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WebhookController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WebhookController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_webhook_dto_1.UpdateWebhookDto]),
    __metadata("design:returntype", void 0)
], WebhookController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WebhookController.prototype, "remove", null);
WebhookController = __decorate([
    (0, common_1.Controller)('webhook'),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2,
        webhook_service_1.WebhookService])
], WebhookController);
exports.WebhookController = WebhookController;
//# sourceMappingURL=webhook.controller.js.map