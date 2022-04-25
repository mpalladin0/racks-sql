import { UnitEventRacks } from "src/bank/event/UnitEvent.racks.event";
export interface CustomerCreatedEvent {
    type: UnitEventRacks['type'];
    id: UnitEventRacks['id'];
    attributes: {
        createdAt: UnitEventRacks['attributes']['createdAt'];
        fullName: {
            first: string;
            last: string;
        };
        ssn: string;
        address: {
            street: string;
            city: string;
            state: string;
            postalCode: string;
            country: string;
        };
        dateOfBirth: string;
        email: string;
        phone: {
            countryCode: string;
            number: string;
        };
        status: UnitEventRacks['attributes']['newStatus'] | string;
        message: string;
        evaluationId: string;
        soleProprietorship: boolean;
        tags: UnitEventRacks['attributes']['tags'];
        archived: boolean;
    };
    relationships: UnitEventRacks['relationships'];
}
