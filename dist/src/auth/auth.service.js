"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const unit_node_sdk_1 = require("@unit-finance/unit-node-sdk");
const event_emitter_1 = require("@nestjs/event-emitter");
const user_authenticated_event_1 = require("./user-authenticated.event");
const ApplicationRefreshStatus_event_1 = require("../applications/forms/event/ApplicationRefreshStatus.event");
const UNIT_TOKEN = 'v2.public.eyJyb2xlIjoiYWRtaW4iLCJ1c2VySWQiOiIxNzE1Iiwic3ViIjoicGxhbnRfc2xhY2tlcjBuQGljbG91ZC5jb20iLCJleHAiOiIyMDIzLTA0LTE0VDE2OjMxOjIzLjYyOVoiLCJqdGkiOiIxMzUwOTgiLCJvcmdJZCI6Ijk5NSIsInNjb3BlIjoiYXBwbGljYXRpb25zIGFwcGxpY2F0aW9ucy13cml0ZSBjdXN0b21lcnMgY3VzdG9tZXJzLXdyaXRlIGN1c3RvbWVyLXRhZ3Mtd3JpdGUgY3VzdG9tZXItdG9rZW4td3JpdGUgYWNjb3VudHMgYWNjb3VudHMtd3JpdGUgY2FyZHMgY2FyZHMtd3JpdGUgY2FyZHMtc2Vuc2l0aXZlIGNhcmRzLXNlbnNpdGl2ZS13cml0ZSB0cmFuc2FjdGlvbnMgdHJhbnNhY3Rpb25zLXdyaXRlIGF1dGhvcml6YXRpb25zIHN0YXRlbWVudHMgcGF5bWVudHMgcGF5bWVudHMtd3JpdGUgcGF5bWVudHMtd3JpdGUtY291bnRlcnBhcnR5IHBheW1lbnRzLXdyaXRlLWFjaC1kZWJpdCBjb3VudGVycGFydGllcyBjb3VudGVycGFydGllcy13cml0ZSBiYXRjaC1yZWxlYXNlcyBiYXRjaC1yZWxlYXNlcy13cml0ZSB3ZWJob29rcyB3ZWJob29rcy13cml0ZSBldmVudHMgZXZlbnRzLXdyaXRlIGF1dGhvcml6YXRpb24tcmVxdWVzdHMgYXV0aG9yaXphdGlvbi1yZXF1ZXN0cy13cml0ZSBjaGVjay1kZXBvc2l0cyBjaGVjay1kZXBvc2l0cy13cml0ZSByZWNlaXZlZC1wYXltZW50cyByZWNlaXZlZC1wYXltZW50cy13cml0ZSBkaXNwdXRlcyBjaGFyZ2ViYWNrcyBjaGFyZ2ViYWNrcy13cml0ZSByZXdhcmRzIHJld2FyZHMtd3JpdGUiLCJvcmciOiJCb29tIiwic291cmNlSXAiOiIiLCJ1c2VyVHlwZSI6Im9yZyIsImlzVW5pdFBpbG90IjpmYWxzZX17wiw8WXgy-cwxzerOBxjD6jZDJv6YLCQK36uXEfT5vrxDOsXnBQo15Al_hvg9yL5qTY-CVbltsh_d125-A4cD';
const UNIT_API_URL = 'https://api.s.unit.sh/';
let AuthService = class AuthService {
    constructor(usersService, jwtService, eventEmitter) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.eventEmitter = eventEmitter;
        this.unit = new unit_node_sdk_1.Unit(UNIT_TOKEN, UNIT_API_URL);
    }
    async validateUser(username, pass) {
        const user = await this.usersService.findOneByEmail(username);
        if (user) {
            const isMatch = await bcrypt.compare(pass, user.password);
            if (isMatch) {
                this.User = user;
                this.eventEmitter.emit('applications.status.refresh', new ApplicationRefreshStatus_event_1.ApplicationRefreshStatusEvent(user.uuid));
                const { password } = user, result = __rest(user, ["password"]);
                return result;
            }
            else {
                return null;
            }
        }
        return null;
    }
    async login(user) {
        const payload = { email: this.User.email, sub: this.User.uuid };
        const token = this.jwtService.sign(payload);
        const user_uuid = this.User.uuid;
        this.eventEmitter.emit('user.login.authenticated');
        return {
            access_token: token,
            uuid: user_uuid,
        };
    }
    async getNeeded() {
        const unit_id = this.User.unit_id;
        const unit_applications = this.User.applications;
        const profile = this.User.profile;
        if (unit_id === null || typeof unit_id === 'undefined')
            this.eventEmitter.emit('user.needs.unit_id', new user_authenticated_event_1.UserAuthenticatedEvent('user.needs.unit_id'));
        if (profile === null || typeof profile === 'undefined')
            this.eventEmitter.emit('user.needs.profile', new user_authenticated_event_1.UserAuthenticatedEvent('user.needs.profile'));
        if (unit_applications === null || unit_applications.length == 0 || typeof unit_applications === 'undefined')
            this.eventEmitter.emit('user.needs.applications', new user_authenticated_event_1.UserAuthenticatedEvent('user.needs.applications'));
        else
            this.eventEmitter.emit('user.refresh.applications', new user_authenticated_event_1.UserAuthenticatedEvent('user.refresh.applications', {
                user_uuid: this.User.uuid,
                applications: this.User.applications
            }));
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)('user.login.authenticated'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "getNeeded", null);
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        event_emitter_1.EventEmitter2])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map