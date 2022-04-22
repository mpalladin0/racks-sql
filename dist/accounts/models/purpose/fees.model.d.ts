import { Model } from "sequelize-typescript";
import { Purpose } from "./purpose.model";
export declare class Fees extends Model {
    fees_uuid: string;
    purpose_uuid: Purpose;
    purpose: Purpose;
}
