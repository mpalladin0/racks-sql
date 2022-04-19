export class UserAuthenticatedEvent {
    type: string
    payload: any | null

    constructor(type: string, payload?: any | null) {
        this.type = type;
        this.payload = payload ? payload : null
    }
}
