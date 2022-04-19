import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Unit } from '@unit-finance/unit-node-sdk';
import { Application } from 'src/applications/models/application.model';
import { User } from 'src/user/models/user.model';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { UserAuthenticatedEvent } from './user-authenticated.event';


const UNIT_TOKEN = 'v2.public.eyJyb2xlIjoiYWRtaW4iLCJ1c2VySWQiOiIxNzE1Iiwic3ViIjoicGxhbnRfc2xhY2tlcjBuQGljbG91ZC5jb20iLCJleHAiOiIyMDIzLTA0LTE0VDE2OjMxOjIzLjYyOVoiLCJqdGkiOiIxMzUwOTgiLCJvcmdJZCI6Ijk5NSIsInNjb3BlIjoiYXBwbGljYXRpb25zIGFwcGxpY2F0aW9ucy13cml0ZSBjdXN0b21lcnMgY3VzdG9tZXJzLXdyaXRlIGN1c3RvbWVyLXRhZ3Mtd3JpdGUgY3VzdG9tZXItdG9rZW4td3JpdGUgYWNjb3VudHMgYWNjb3VudHMtd3JpdGUgY2FyZHMgY2FyZHMtd3JpdGUgY2FyZHMtc2Vuc2l0aXZlIGNhcmRzLXNlbnNpdGl2ZS13cml0ZSB0cmFuc2FjdGlvbnMgdHJhbnNhY3Rpb25zLXdyaXRlIGF1dGhvcml6YXRpb25zIHN0YXRlbWVudHMgcGF5bWVudHMgcGF5bWVudHMtd3JpdGUgcGF5bWVudHMtd3JpdGUtY291bnRlcnBhcnR5IHBheW1lbnRzLXdyaXRlLWFjaC1kZWJpdCBjb3VudGVycGFydGllcyBjb3VudGVycGFydGllcy13cml0ZSBiYXRjaC1yZWxlYXNlcyBiYXRjaC1yZWxlYXNlcy13cml0ZSB3ZWJob29rcyB3ZWJob29rcy13cml0ZSBldmVudHMgZXZlbnRzLXdyaXRlIGF1dGhvcml6YXRpb24tcmVxdWVzdHMgYXV0aG9yaXphdGlvbi1yZXF1ZXN0cy13cml0ZSBjaGVjay1kZXBvc2l0cyBjaGVjay1kZXBvc2l0cy13cml0ZSByZWNlaXZlZC1wYXltZW50cyByZWNlaXZlZC1wYXltZW50cy13cml0ZSBkaXNwdXRlcyBjaGFyZ2ViYWNrcyBjaGFyZ2ViYWNrcy13cml0ZSByZXdhcmRzIHJld2FyZHMtd3JpdGUiLCJvcmciOiJCb29tIiwic291cmNlSXAiOiIiLCJ1c2VyVHlwZSI6Im9yZyIsImlzVW5pdFBpbG90IjpmYWxzZX17wiw8WXgy-cwxzerOBxjD6jZDJv6YLCQK36uXEfT5vrxDOsXnBQo15Al_hvg9yL5qTY-CVbltsh_d125-A4cD'
const UNIT_API_URL = 'https://api.s.unit.sh/'


export interface UserAuthenticatedJWTPayload {
    access_token: string,
    uuid: string
}
@Injectable()
export class AuthService {
    unit = new Unit(UNIT_TOKEN, UNIT_API_URL)
    User: User

    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
        private eventEmitter: EventEmitter2
        ) {}

    async validateUser(username: string, pass: string) {
        const user = await this.usersService.findOneByEmail(username)

        if (user) {
            const isMatch = await bcrypt.compare(pass, user.password)
        
            if (isMatch) {
                this.User = user;
                const { password, ...result } = user
                return result;
            } else {
                return null;
            }
        }

        return null;
    }

    async login(user: any) {
        const payload = { email: this.User.email, sub: this.User.uuid };
        const token = this.jwtService.sign(payload)
        const user_uuid = this.User.uuid;

        this.eventEmitter.emit('user.login.authenticated')
            
        return {
            access_token: token,
            uuid: user_uuid,
        } as UserAuthenticatedJWTPayload
    }

    @OnEvent('user.login.authenticated')
    async getNeeded() {
        const unit_id = this.User.unit_id;
        const unit_applications = this.User.applications
        const profile = this.User.profile;

        if (unit_id === null || typeof unit_id === 'undefined') this.eventEmitter.emit('user.needs.unit_id', new UserAuthenticatedEvent('user.needs.unit_id'))
        if (profile === null || typeof profile === 'undefined') this.eventEmitter.emit('user.needs.profile', new UserAuthenticatedEvent('user.needs.profile'))
        if (unit_applications === null || unit_applications.length == 0 || typeof unit_applications === 'undefined') this.eventEmitter.emit('user.needs.applications', new UserAuthenticatedEvent('user.needs.applications'))
        else this.eventEmitter.emit('user.refresh.applications', new UserAuthenticatedEvent('user.refresh.applications', {
            user_uuid: this.User.uuid,
            applications: this.User.applications
        }))

    }

    // /**
    //  * After login, ping Unit and refresh any data that might have changed (Applications, Customers, etc)
    //  * and update internal user data accordingly
    //  * @param user_uuid 
    //  */
    // async refreshFromUnit() {
    //     const unit_id = this.User.unit_id;
    //     const unit_applications = this.User.applications
    //     const profile = this.User.profile;

    //     let hasProfile: boolean = false;
    //     let hasApplications: boolean = false;

    //     /**
    //      * Check if user has setup their profile yet, if not return
    //      */
    //     if (profile.length === 0) hasProfile = false;
    //     else hasProfile = true;

    //     if (unit_applications.length === 0) hasApplications = false;
    //     else hasApplications = true

    //     /**
    //      * Check if theres no unit_id and no applications have been submitted
    //      */

    //     if (hasApplications && hasProfile) {
    //         unit_applications.forEach(a => {
    //             const application: Application = a;

    //             switch (application.status) {
    //                 case 'pending': {

    //                 }

    //                 break;
    //                 case 'approved': {

    //                 }
    //                 break;

    //                 case 'denied': {

    //                 }
    //                 break;

    //                 default:
    //                     throw new Error("Unknown status: " + application.status);

    //             }
                
    //         })

    //     }

       
    // }
}
