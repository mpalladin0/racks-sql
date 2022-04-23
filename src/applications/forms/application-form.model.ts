import { ApplicationForms, ApplicationFormStage, Applications } from "@unit-finance/unit-node-sdk";
import { UUIDV4 } from "sequelize";
import { UUID } from "sequelize";
import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { ApplicationModel } from "../application.model";

/**
 * See: https://docs.unit.co/applications/#application-statuses
 */
// export enum ApplicationFormStatus {
//     pending = 'pending',
//     pending_review = 'pending_review',
//     approved = 'approved',
//     denied = 'denied',
//     awaiting_documents = 'awaiting_documents'
// }

/**
 * See: https://docs.unit.co/application-forms#keeping-track-of-the-application-form-status
 * 
 * Current stage of the application form, one of: 
 * ChooseBusinessOrIndividual, 
 * EnterIndividualInformation, 
 * IndividualPhoneVerification, 
 * IndividualApplicationCreated, 
 * EnterBusinessInformation, 
 * EnterOfficerInformation, 
 * BusinessPhoneVerification, 
 * EnterBeneficialOwnersInformation, 
 * BusinessApplicationCreated, 
 * EnterSoleProprietorshipInformation, 
 * SoleProprietorshipPhoneVerification, 
 * SoleProprietorshipApplicationCreated
 */

@Table
export class ApplicationFormModel extends Model {
    @Column({ type: UUID, defaultValue: UUIDV4, primaryKey: true, })
    application_form_uuid: string

    @ForeignKey(() => ApplicationModel)
    application_uuid: string;

    @BelongsTo(() => ApplicationModel, 'application_uuid')
    application: ApplicationModel

    /**
     * Everything below associated with ApplicationFormModel
     */

    @Column
    url: string

    @Column
    unit_id: string

    @Column({ defaultValue: 'ChooseBusinessOrIndividual' })
    status: ApplicationFormStage


}