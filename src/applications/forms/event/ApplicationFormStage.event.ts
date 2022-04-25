/**
 * See https://docs.unit.co/application-forms#keeping-track-of-the-application-form-status
 */

export class ApplicationFormStageEvent {
    user_uuid: string
    constructor(user_uuid: string) {
        this.user_uuid = user_uuid;
    }
}