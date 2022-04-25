declare module namespace {
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
    interface Datum {
        id: string;
        type: string;
        attributes: Attributes;
        relationships: Relationships;
    }
    interface CustomerCreatedEvent {
        data: Datum[];
    }
}
