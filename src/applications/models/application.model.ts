import { UUIDV4 } from "sequelize";
import { UUID } from "sequelize";
import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/user/models/user.model";

/**
 * See: https://docs.unit.co/applications/#application-statuses
 */
export enum ApplicationStatus {
    pending = 'pending',
    pending_review = 'pending_review',
    approved = 'approved',
    denied = 'denied',
    awaiting_documents = 'awaiting_documents'
  }

@Table
export class Application extends Model {
    @Column({ type: UUID, defaultValue: UUIDV4, primaryKey: true   })
    application_uuid: string

    @Column
    url: string

    @Column
    unit_id: string

    @Column({ defaultValue: 'pending' })
    status: string

    @ForeignKey(() => User)
    // @Column
    user_uuid: String;

    @BelongsTo(() => User)
    user: User


}