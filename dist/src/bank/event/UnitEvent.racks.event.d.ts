import { CustomerCreated, UnitEvent } from "@unit-finance/unit-node-sdk";
export declare class UnitEventRacks {
    attributes?: UnitEvent['attributes'];
    id: UnitEvent['id'];
    type: UnitEvent['type'];
    relationships?: UnitEvent['relationships'];
    constructor(attributes?: UnitEvent['attributes'], id?: UnitEvent['id'], type?: UnitEvent['type'], relationships?: UnitEvent['relationships']);
    getCustomerCreatedEvent(event: UnitEventRacks['type']): CustomerCreated;
}
