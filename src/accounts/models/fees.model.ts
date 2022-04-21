import { DataTypes, Sequelize, UUID, UUIDV4 } from "sequelize";
import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { DepositProductModel } from "./deposit_product.model";

@Table
export class FeesModel extends Model {
    @Column({ type: UUID, defaultValue: UUIDV4, primaryKey: true })
    fees_uuid: string;

    @ForeignKey(() => DepositProductModel)
    // @Column
    deposit_product_uuid: string;

    @BelongsTo(() => DepositProductModel)
    deposit_product: DepositProductModel

    /**
     * Everything below associated with Fees
     */

    @Column({ allowNull: false, defaultValue: 1.25, type: DataTypes.DOUBLE })
    ach_transfer: typeof DataTypes.DOUBLE

    @Column({ allowNull: false, defaultValue: 1.25, type: DataTypes.DOUBLE })
    atm_in_network: number

    @Column({ allowNull: false, defaultValue: 2.25, type: DataTypes.DOUBLE })
    atm_out_network: number

}