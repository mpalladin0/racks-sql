import { Model } from "sequelize-typescript";
import { Purpose } from "./purpose.model";
export declare class Limits extends Model {
    limits_uuid: string;
    purpose_uuid: Purpose;
    purpose: Purpose;
}
