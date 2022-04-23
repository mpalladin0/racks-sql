import { ApplicationFormStage, ApplicationStatus } from "@unit-finance/unit-node-sdk";
import { UUID, UUIDV4 } from "sequelize";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, Sequelize, Table } from "sequelize-typescript";
import { User } from "src/user/models/user.model";
import { ApplicationDocumentsModel } from "./documents/application-documents.model";
import { ApplicationFormModel } from "./forms/application-form.model";

@Table
export class ApplicationModel extends Model {
    @Column({ type: UUID, defaultValue: UUIDV4, primaryKey: true, })
    application_uuid: string

    @ForeignKey(() => User)
    user_uuid: string;

    @BelongsTo(() => User, 'user_uuid')
    user: User

    /**
     * Everything below associated with ApplicationModel
     */
 
    @HasMany(() => ApplicationDocumentsModel)
    documents: ApplicationDocumentsModel[]

    @HasOne(() => ApplicationFormModel)
    form: ApplicationFormModel

    @Column({ type: DataType.STRING, defaultValue: 'ChooseBusinessOrIndividual' })
    stage: ApplicationFormStage

    @Column({ type: DataType.STRING, defaultValue: 'Pending' })
    status: ApplicationStatus

    /**
     * Assigned once ApplicationStatus = "APPROVED"
     * Unit event: 'customer.created'
     * See: https://docs.unit.co/events/#customercreated
     * See: https://docs.unit.co/customers
     */
    @Column({ type: DataType.STRING, defaultValue: null })
    unit_customer_id: string
}