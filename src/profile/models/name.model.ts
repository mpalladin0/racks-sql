import { UUIDV4 } from "sequelize";
import { UUID } from "sequelize";
import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Profile } from "./profile.model";

@Table
export class Name extends Model {
    @Column({ type: UUID, defaultValue: UUIDV4, primaryKey: true })
    name_uuid: string

    @Column
    first: string

    @Column
    middle: string

    @Column
    last: string

    @ForeignKey(() => Profile)
    // @Column
    profile_uuid: String;

    @BelongsTo(() => Profile)
    user: Profile


}