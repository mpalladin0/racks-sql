import { UUIDV4 } from "sequelize";
import { UUID } from "sequelize";
import { BelongsTo, Column, ForeignKey, HasOne, Model, Table } from "sequelize-typescript";
import { Profile } from "./profile.model";

@Table
export class Residence extends Model {
    @Column({ type: UUID, defaultValue: UUIDV4, primaryKey: true   })
    residence_uuid: string

    @Column({ defaultValue: 'Primary' })
    type: string

    @Column
    state: string

    @Column
    city: string

    @Column
    zip_code: number

    @Column
    address: string

    @ForeignKey(() => Profile)
    @Column
    profile_uuid: String;

    @BelongsTo(() => Profile)
    profile: Profile


}