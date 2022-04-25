import { Relationship, UnitEvent } from "@unit-finance/unit-node-sdk";
export declare module CustomerCreatedEventNamespace {
    interface Tags {
        tag: string;
    }
    interface Attributes {
        createdAt: Date;
        tags: Tags;
    }
    interface Data {
        id: string;
        type: string;
    }
    interface Customer {
        data: Data;
    }
    interface Data2 {
        id: string;
        type: string;
    }
    interface Application {
        data: Data2;
    }
    interface Relationships {
        customer: Customer;
        application: Application;
    }
    interface Datam {
        id: string;
        type: UnitEvent['type'];
        attributes: Attributes;
        relationships: Relationship;
    }
    interface CustomerCreatedEvent {
        data?: Datam;
    }
}
