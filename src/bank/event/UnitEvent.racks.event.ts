import { CustomerCreated, UnitEvent } from "@unit-finance/unit-node-sdk";
import { CustomerCreatedEvent } from "../interfaces/unit/types/CustomerCreatedEvent.interface";

export class UnitEventRacks {
    public attributes?: UnitEvent['attributes'] = null;
    public id: UnitEvent['id'] = null
    public type: UnitEvent['type'] = null
    public relationships?: UnitEvent['relationships'] = null

    constructor(
        attributes?: UnitEvent['attributes'], 
        id?: UnitEvent['id'],
        type?: UnitEvent['type'],
        relationships?: UnitEvent['relationships']
    ) {
        this.attributes = attributes;
        this.id = id;
        this.type = type;
        this.relationships = relationships;
    }

    public getCustomerCreatedEvent(event: UnitEventRacks['type']) {
        if (event === null) throw new Error("type not found.")
        return this as unknown as CustomerCreated;

    }

    // public getAttributes(): UnitEvent['attributes'] {
    //     if (this.attributes === null) throw new Error("Attributes not found.")
    //     return this.attributes;
    // }

    // public getId(): UnitEvent['id'] {
    //     if (this.id === null) throw new Error("id not found.")
    //     return this.id;
    // }

    // public getType(): UnitEvent['type'] {
    //     if (this.type === null) throw new Error("type not found.")
    //     return this.type;
    // }

    // public getRelationships(): UnitEvent['relationships'] {
    //     if (this.type === null) throw new Error("relationships not found.")
    //     return this.relationships;
    // }



}