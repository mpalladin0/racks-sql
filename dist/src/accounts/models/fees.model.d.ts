import { DataTypes } from "sequelize";
import { Model } from "sequelize-typescript";
import { DepositProductModel } from "./deposit_product.model";
export declare class FeesModel extends Model {
    fees_uuid: string;
    deposit_product_uuid: string;
    deposit_product: DepositProductModel;
    ach_transfer: typeof DataTypes.DOUBLE;
    atm_in_network: number;
    atm_out_network: number;
}
