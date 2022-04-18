import { UUIDV4 } from "sequelize";
import { UUID } from "sequelize";
import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/user/models/user.model";

@Table
export class Application extends Model {
    @Column({ type: UUID, defaultValue: UUIDV4, primaryKey: true   })
    application_uuid: string

    @Column
    url: string

    @Column
    unit_id: string

    @ForeignKey(() => User)
    @Column
    user_uuid: String;

    @BelongsTo(() => User)
    user: User


}