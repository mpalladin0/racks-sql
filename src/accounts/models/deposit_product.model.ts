import { UUID, UUIDV4 } from "sequelize";
import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { AccountModel } from "./account.model";
import { ClearingPeriodsModel } from "./clearing_periods.model";
import { FeesModel } from "./fees.model";
import { LimitsModel } from "./limits.model";

type PurposeTypes = 'CHECKING' | 'SAVING' | 'TAX BENEFIT'
type TierTypes = 'NOIR' | 'VIGNETTE' | 'TBD'

@Table
export class DepositProductModel extends Model {
    @Column({ type: UUID, defaultValue: UUIDV4, primaryKey: true })
    deposit_product_uuid: string;

    @ForeignKey(() => AccountModel)
    // @Column
    account_uuid: string;

    @BelongsTo(() => AccountModel)
    account: AccountModel

    /**
     * Eveything below associated with DepositProduct
     */

    @Column
    purpose: PurposeTypes

    @Column
    tier: TierTypes

    @HasMany(() => FeesModel)
    fees: FeesModel

    @HasMany(() => LimitsModel)
    limits: LimitsModel

    @HasMany(() => ClearingPeriodsModel)
    clearing_periods: ClearingPeriodsModel



}

export type { PurposeTypes as DepositProductPurposeTypes }
export type { TierTypes as DepositProductTierTypes }