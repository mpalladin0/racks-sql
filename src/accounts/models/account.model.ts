import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { Unit } from "@unit-finance/unit-node-sdk";
import { UUID } from "sequelize";
import { UUIDV4 } from "sequelize";
import { Column, ForeignKey, Table, BelongsTo, HasMany, Model, DataType } from "sequelize-typescript";
import { User } from "src/user/models/user.model";
import { DepositProductModel } from "./deposit_product.model";

type StatusTypes = 'OPEN' | 'CLOSED' | 'FROZEN' | 'PENDING'
type CurrencyTypes = 'USD'

const UNIT_TOKEN = 'v2.public.eyJyb2xlIjoiYWRtaW4iLCJ1c2VySWQiOiIxNzE1Iiwic3ViIjoicGxhbnRfc2xhY2tlcjBuQGljbG91ZC5jb20iLCJleHAiOiIyMDIzLTA0LTE0VDE2OjMxOjIzLjYyOVoiLCJqdGkiOiIxMzUwOTgiLCJvcmdJZCI6Ijk5NSIsInNjb3BlIjoiYXBwbGljYXRpb25zIGFwcGxpY2F0aW9ucy13cml0ZSBjdXN0b21lcnMgY3VzdG9tZXJzLXdyaXRlIGN1c3RvbWVyLXRhZ3Mtd3JpdGUgY3VzdG9tZXItdG9rZW4td3JpdGUgYWNjb3VudHMgYWNjb3VudHMtd3JpdGUgY2FyZHMgY2FyZHMtd3JpdGUgY2FyZHMtc2Vuc2l0aXZlIGNhcmRzLXNlbnNpdGl2ZS13cml0ZSB0cmFuc2FjdGlvbnMgdHJhbnNhY3Rpb25zLXdyaXRlIGF1dGhvcml6YXRpb25zIHN0YXRlbWVudHMgcGF5bWVudHMgcGF5bWVudHMtd3JpdGUgcGF5bWVudHMtd3JpdGUtY291bnRlcnBhcnR5IHBheW1lbnRzLXdyaXRlLWFjaC1kZWJpdCBjb3VudGVycGFydGllcyBjb3VudGVycGFydGllcy13cml0ZSBiYXRjaC1yZWxlYXNlcyBiYXRjaC1yZWxlYXNlcy13cml0ZSB3ZWJob29rcyB3ZWJob29rcy13cml0ZSBldmVudHMgZXZlbnRzLXdyaXRlIGF1dGhvcml6YXRpb24tcmVxdWVzdHMgYXV0aG9yaXphdGlvbi1yZXF1ZXN0cy13cml0ZSBjaGVjay1kZXBvc2l0cyBjaGVjay1kZXBvc2l0cy13cml0ZSByZWNlaXZlZC1wYXltZW50cyByZWNlaXZlZC1wYXltZW50cy13cml0ZSBkaXNwdXRlcyBjaGFyZ2ViYWNrcyBjaGFyZ2ViYWNrcy13cml0ZSByZXdhcmRzIHJld2FyZHMtd3JpdGUiLCJvcmciOiJCb29tIiwic291cmNlSXAiOiIiLCJ1c2VyVHlwZSI6Im9yZyIsImlzVW5pdFBpbG90IjpmYWxzZX17wiw8WXgy-cwxzerOBxjD6jZDJv6YLCQK36uXEfT5vrxDOsXnBQo15Al_hvg9yL5qTY-CVbltsh_d125-A4cD'
const UNIT_API_URL = 'https://api.s.unit.sh/'
@Table
export class AccountModel extends Model {
    @Column({ type: UUID, defaultValue: UUIDV4, primaryKey: true, })
    account_uuid: string

    @ForeignKey(() => User)
    // @Column
    user_uuid: string;

    @BelongsTo(() => User, 'user_uuid')
    user: User

    /**
     * Everything below associated with AccountModel
     */

    @HasMany(() => DepositProductModel)
    deposit_product: DepositProductModel[]

    @Column({ 
        allowNull: false, 
        defaultValue: "PENDING",
        type: DataType.STRING,
        get: function () { return this.getDataValue('status') },
        set: function (value) { this.setDataValue('status', value) }
    })
    status: string

    @Column({ allowNull: false, defaultValue: "USD" })
    currency: string

    @Column({ allowNull: false, defaultValue: 0 })
    balance: number

    @Column({ allowNull: false, defaultValue: 0 })
    hold: number

    @Column({ allowNull: false, defaultValue: 0 })
    available: number

    @Column({ allowNull: false, defaultValue: "" })
    routing_number: string

    @Column({ allowNull: false, defaultValue: "" })
    account_number: string

    // @HasMany(() => User)
    // account_owners: User[] 

}

export type { StatusTypes as AccountStatusTypes }
export type { CurrencyTypes as AccountCurrencyTypes }

