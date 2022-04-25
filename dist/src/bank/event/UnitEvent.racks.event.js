"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitEventRacks = void 0;
class UnitEventRacks {
    constructor(attributes, id, type, relationships) {
        this.attributes = null;
        this.id = null;
        this.type = null;
        this.relationships = null;
        this.attributes = attributes;
        this.id = id;
        this.type = type;
        this.relationships = relationships;
    }
    getCustomerCreatedEvent(event) {
        if (event === null)
            throw new Error("type not found.");
        return this;
    }
}
exports.UnitEventRacks = UnitEventRacks;
//# sourceMappingURL=UnitEvent.racks.event.js.map