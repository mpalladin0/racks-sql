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
exports.RacksBank = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const constants_1 = require("./constants");
const unit_node_sdk_1 = require("@unit-finance/unit-node-sdk");
const event_emitter_1 = require("@nestjs/event-emitter");
const UnitEvent_racks_event_1 = require("./event/UnitEvent.racks.event");
let RacksBank = class RacksBank {
    constructor(options) {
        const API_TOKEN = options.api_token;
        const API_URL = options.url;
        try {
            fs.readdir(__dirname + `/interfaces/unit/json`, (err, files) => {
                console.log('\tCompiling Unit interfaces...');
                console.log(files);
            });
        }
        catch (err) {
            throw err;
        }
        try {
            this.unitRef = new unit_node_sdk_1.Unit(API_TOKEN, API_URL);
        }
        catch (err) {
            throw err;
        }
    }
    async handleUnitEvents(event) {
        switch (event.type) {
            case 'customer.created':
                const { attributes, id, relationships, type } = event.getCustomerCreatedEvent(event.type);
                const applicationId = relationships.application.data.id;
                const unitId = relationships.customer.data.id;
                console.log(applicationId, unitId);
                break;
        }
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)('unit'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UnitEvent_racks_event_1.UnitEventRacks]),
    __metadata("design:returntype", Promise)
], RacksBank.prototype, "handleUnitEvents", null);
RacksBank = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.CONFIG_OPTIONS)),
    __metadata("design:paramtypes", [Object])
], RacksBank);
exports.RacksBank = RacksBank;
//# sourceMappingURL=racksbank.service.js.map