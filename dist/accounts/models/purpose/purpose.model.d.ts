import { Model } from "sequelize-typescript";
import { AccountModel } from "../account.model";
import { ClearingPeriods } from "./clearing.periods";
import { Fees } from "./fees.model";
import { Limits } from "./limits.model";
declare type PurposeTypes = 'CHECKING' | 'SAVING' | 'TAX BENEFIT';
export declare class Purpose extends Model {
    purpose_uuid: string;
    type: PurposeTypes;
    interest_rate_paid_to_owners: string;
    fees: Fees[];
    limits: Limits[];
    clearing_periods: ClearingPeriods[];
    account_uuid: AccountModel;
    user: AccountModel;
}
export type { PurposeTypes as DepositProductPurposeTypes };
