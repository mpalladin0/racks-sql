import { UUID } from "sequelize";
import { UUIDV4 } from "sequelize";
import { Column, HasMany, Model, Table } from "sequelize-typescript";
import { AccountModel } from "src/accounts/models/account.model";
import { Application } from "src/applications/models/application.model";
import { Profile } from "src/profile/models/profile.model";

@Table
export class User extends Model {
    @Column({ type: UUID, defaultValue: UUIDV4, primaryKey: true })
    uuid: string

    @Column({ unique: true, validate: { isEmail: true, notEmpty: true } })
    email: string

    @Column({ validate: { notEmpty: true } })
    password: string

    @Column
    unit_id: number;

    @HasMany(() => Profile)
    profile: Profile[]

    @HasMany(() => Application)
    applications: Application[]

    @HasMany(() => AccountModel)
    accounts: AccountModel[]

}
