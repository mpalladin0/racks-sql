import { UUID, UUIDV4 } from "sequelize";
import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { DepositProductModel } from "./deposit_product.model";

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
}