import { ApplicationFormStage } from "@unit-finance/unit-node-sdk";
import { Model } from "sequelize-typescript";
import { ApplicationModel } from "../application.model";
export declare class ApplicationFormModel extends Model {
    application_form_uuid: string;
    application_uuid: string;
    application: ApplicationModel;
    url: string;
    unit_id: string;
    status: ApplicationFormStage;
}
