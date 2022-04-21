import { DataTypes, UUID, UUIDV4 } from "sequelize";
import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { DepositProductModel } from "./deposit_product.model";
import { LimitsModel } from "./limits.model";

@Table
export class LimitsDurationModel extends Model {
    @Column({ type: UUID, defaultValue: UUIDV4, primaryKey: true })
    limits_duration_uuid: string;

    @ForeignKey(() => LimitsModel)
    // @Column
    limits_uuid: string;

    @BelongsTo(() => LimitsModel, 'limits_uuid')
    limits: LimitsModel    

     /**
     * Everything below associated with LimitsDuration
     */

    @Column({ allowNull: false, defaultValue: 300, type: DataTypes.DOUBLE })
    daily: number

    @Column({ allowNull: false, defaultValue: 2100, type: DataTypes.DOUBLE })
    weekly: number

    @Column({ allowNull: false, defaultValue: 8400, type: DataTypes.DOUBLE })
    monthly: number

}