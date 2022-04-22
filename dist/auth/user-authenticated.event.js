"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAuthenticatedEvent = void 0;
class UserAuthenticatedEvent {
    constructor(type, payload) {
        this.type = type;
        this.payload = payload ? payload : null;
    }
}
exports.UserAuthenticatedEvent = UserAuthenticatedEvent;
//# sourceMappingURL=user-authenticated.event.js.map