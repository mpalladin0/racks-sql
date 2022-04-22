import { Model } from "sequelize-typescript";
import { Purpose } from "./purpose.model";
export declare class ClearingPeriods extends Model {
    clearing_periods_uuid: string;
    purpose_uuid: Purpose;
    purpose: Purpose;
}
