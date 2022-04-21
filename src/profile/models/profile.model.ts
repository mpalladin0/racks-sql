import { UUIDV4 } from "sequelize";
import { UUID } from "sequelize";
import { BelongsTo, Column, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { User } from "src/user/models/user.model";
import { Name } from "./name.model";
import { Residence } from "./residence.model";

@Table
export class Profile extends Model {
    @Column({ type: UUID, defaultValue: UUIDV4, primaryKey: true })
    profile_uuid: string

    @HasMany(() => Name)
    name: Name[]

    @Column
    dob: string

    @HasMany(() => Residence)
    residence: Residence[]

    @ForeignKey(() => User)
    // @Column
    user_uuid: String;

    @BelongsTo(() => User)
    user: User


}