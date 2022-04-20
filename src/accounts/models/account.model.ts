import { UUID } from "sequelize";
import { UUIDV4 } from "sequelize";
import { Column, ForeignKey, Table, BelongsTo, HasMany, Model } from "sequelize-typescript";
import { User } from "src/user/models/user.model";
import { DepositProductModel } from "./deposit_product.model";

type StatusTypes = 'OPEN' | 'CLOSED' | 'FROZEN' | 'PENDING'
type CurrencyTypes = 'USD'
@Table
export class AccountModel extends Model {
    @Column({ type: UUID, defaultValue: UUIDV4, primaryKey: true })
    account_uuid: string

    @ForeignKey(() => User)
    @Column
    user_uuid: string;

    @BelongsTo(() => User)
    user: User

    /**
     * Everything below associated with AccountModel
     */

    @HasMany(() => DepositProductModel)
    deposit_product: DepositProductModel[]

    @Column({ allowNull: false, defaultValue: "PENDING" })
    status: string

    @Column({ allowNull: false, defaultValue: "USD" })
    currency: string

    @Column({ allowNull: false, defaultValue: 0 })
    balance: number

    @Column({ allowNull: false, defaultValue: 0 })
    hold: number

    @Column({ allowNull: false, defaultValue: 0 })
    available: number

    @Column({ allowNull: true })
    routing_number: string

    @Column({ allowNull: true })
    account_number: string

    // @HasMany(() => User)
    // account_owners: User[] 

}

export type { StatusTypes as AccountStatusTypes }
export type { CurrencyTypes as AccountCurrencyTypes }

