import { Model } from "sequelize-typescript";
import { AccountModel } from "./account.model";
declare type PurposeTypes = 'CHECKING' | 'SAVING' | 'TAX BENEFIT';
declare type TierTypes = 'NOIR' | 'VIGNETTE' | 'TBD';
export declare class DepositProductModel extends Model {
    deposit_product_uuid: string;
    account_uuid: AccountModel;
    account: AccountModel;
    purpose: PurposeTypes;
    tier: TierTypes;
}
export {};
