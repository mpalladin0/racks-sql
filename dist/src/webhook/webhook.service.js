"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookService = void 0;
const common_1 = require("@nestjs/common");
let WebhookService = class WebhookService {
    create(createWebhookDto) {
        return 'This action adds a new webhook';
    }
    findAll() {
        return `This action returns all webhook`;
    }
    findOne(id) {
        return `This action returns a #${id} webhook`;
    }
    update(id, updateWebhookDto) {
        return `This action updates a #${id} webhook`;
    }
    remove(id) {
        return `This action removes a #${id} webhook`;
    }
};
WebhookService = __decorate([
    (0, common_1.Injectable)()
], WebhookService);
exports.WebhookService = WebhookService;
//# sourceMappingURL=webhook.service.js.map