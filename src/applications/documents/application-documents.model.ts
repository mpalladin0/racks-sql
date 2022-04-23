import { UUID, UUIDV4 } from "sequelize";
import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/user/models/user.model";
import { ApplicationModel } from "../application.model";

@Table
export class ApplicationDocumentsModel extends Model {
    @Column({ type: UUID, defaultValue: UUIDV4, primaryKey: true, })
    application_documents_uuid: string

    @ForeignKey(() => ApplicationModel)
    application_uuid: string;

    @BelongsTo(() => ApplicationModel, 'application_uuid')
    application: User
    
    /**
     * Everything below associated with ApplicationDocumentsModel
     */
}