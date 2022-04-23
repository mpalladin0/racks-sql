import { ApplicationFormStage, ApplicationStatus } from "@unit-finance/unit-node-sdk";
import { Model } from "sequelize-typescript";
import { User } from "src/user/models/user.model";
import { ApplicationDocumentsModel } from "./documents/application-documents.model";
import { ApplicationFormModel } from "./forms/application-form.model";
export declare class ApplicationModel extends Model {
    application_uuid: string;
    user_uuid: string;
    user: User;
    documents: ApplicationDocumentsModel[];
    form: ApplicationFormModel;
    stage: ApplicationFormStage;
    status: ApplicationStatus;
    unit_customer_id: string;
}
