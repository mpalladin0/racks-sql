import { Model } from "sequelize-typescript";
import { LimitsModel } from "./limits.model";
export declare class LimitsDurationModel extends Model {
    limits_duration_uuid: string;
    limits_uuid: string;
    limits: LimitsModel;
    daily: number;
    weekly: number;
    monthly: number;
}
