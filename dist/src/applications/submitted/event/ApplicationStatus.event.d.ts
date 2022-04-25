import { ApplicationStatus } from "@unit-finance/unit-node-sdk";
export declare class ApplicationStatusEvent {
    status: ApplicationStatus;
    user_uuid: string;
    constructor(status: ApplicationStatus, user_uuid: string);
}
