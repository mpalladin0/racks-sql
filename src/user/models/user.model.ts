import { UUID } from "sequelize";
import { UUIDV4 } from "sequelize";
import { Column, HasMany, Model, Table } from "sequelize-typescript";
import { Account } from "src/accounts/models/account.model";
import { Application } from "src/applications/models/application.model";
import { Profile } from "src/profile/models/profile.model";

@Table
export class User  extends Model {
    @Column({ type: UUID, defaultValue: UUIDV4, primaryKey: true   })
    uuid: string

    @Column({ unique: true, allowNull: false, validate: { isEmail: true, notEmpty: true, notNull: true } })
    public email!: string

    @Column({ allowNull: false, validate: { notNull: true, notEmpty: true } })
    public password!: string

    @Column
    public unit_id: number;

    @HasMany(() => Profile)
    profile: Profile[]

    @HasMany(() => Application)
    applications: Application[]

    // @HasMany(() => Account)
    // accounts: Account[]

}
