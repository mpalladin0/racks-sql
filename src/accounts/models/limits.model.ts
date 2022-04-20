import { UUID, UUIDV4 } from "sequelize";
import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { DepositProductModel } from "./deposit_product.model";
import { LimitsDurationModel } from "./limits.durations.model";

@Table
export class LimitsModel extends Model {
    @Column({ type: UUID, defaultValue: UUIDV4, primaryKey: true })
    limits_uuid: string;

    @ForeignKey(() => DepositProductModel)
    @Column
    deposit_product_uuid: string;

    @BelongsTo(() => DepositProductModel)
    deposit_product: DepositProductModel

    /**
     * Everything below associated with Limits
     */

    @HasMany(() => LimitsDurationModel, 'debit')
    debit: LimitsDurationModel[]

    @HasMany(() => LimitsDurationModel, 'credit')
    credit: LimitsDurationModel[]
    
    @HasMany(() => LimitsDurationModel, 'atm_withdrawl')
    atm_withdrawl: LimitsDurationModel[]

    @HasMany(() => LimitsDurationModel, 'deposit')
    deposit: LimitsDurationModel[]
}