import { ApplicationStatus } from "@unit-finance/unit-node-sdk";
export class ApplicationStatusEvent {
    status: ApplicationStatus;
    user_uuid: string;

    constructor(status: ApplicationStatus, user_uuid: string) {
        this.status = status;
        this.user_uuid = user_uuid;
    }

}