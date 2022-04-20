export class ProfileDeletedEvent {
    type: 'profile.deleted'
    profile_uuid: string

    constructor(profile_uuid: string) {
        this.profile_uuid = profile_uuid
    }
}