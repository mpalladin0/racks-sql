import { Model } from "sequelize-typescript";
import { DepositProductModel } from "./deposit_product.model";
export declare class ClearingPeriodsModel extends Model {
    clearing_periods_uuid: string;
    deposit_product_uuid: string;
    deposit_product: DepositProductModel;
}
