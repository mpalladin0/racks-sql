export class ApplicationRefreshStatusEvent {
    user_uuid: string
    constructor(user_uuid: string) {
        this.user_uuid = user_uuid;
    }
}