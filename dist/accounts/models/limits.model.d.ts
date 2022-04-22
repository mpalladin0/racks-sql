import { Model } from "sequelize-typescript";
import { DepositProductModel } from "./deposit_product.model";
import { LimitsDurationModel } from "./limits.durations.model";
export declare class LimitsModel extends Model {
    limits_uuid: string;
    deposit_product_uuid: string;
    deposit_product: DepositProductModel;
    debit: LimitsDurationModel[];
    credit: LimitsDurationModel[];
    atm_withdrawl: LimitsDurationModel[];
    deposit: LimitsDurationModel[];
}
