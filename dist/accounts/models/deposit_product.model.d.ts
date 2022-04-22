import { Model } from "sequelize-typescript";
import { AccountModel } from "./account.model";
import { ClearingPeriodsModel } from "./clearing_periods.model";
import { FeesModel } from "./fees.model";
import { LimitsModel } from "./limits.model";
declare type PurposeTypes = 'CHECKING' | 'SAVING' | 'TAX BENEFIT';
declare type TierTypes = 'NOIR' | 'VIGNETTE' | 'TBD';
export declare class DepositProductModel extends Model {
    deposit_product_uuid: string;
    account_uuid: string;
    account: AccountModel;
    purpose: PurposeTypes;
    tier: TierTypes;
    fees: FeesModel;
    limits: LimitsModel;
    clearing_periods: ClearingPeriodsModel;
}
export type { PurposeTypes as DepositProductPurposeTypes };
export type { TierTypes as DepositProductTierTypes };
