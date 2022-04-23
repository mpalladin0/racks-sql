import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Unit } from '@unit-finance/unit-node-sdk';
import { User } from 'src/user/models/user.model';
import { EventEmitter2 } from '@nestjs/event-emitter';
export interface UserAuthenticatedJWTPayload {
    access_token: string;
    uuid: string;
}
export declare class AuthService {
    private usersService;
    private jwtService;
    private eventEmitter;
    unit: Unit;
    User: User;
    constructor(usersService: UserService, jwtService: JwtService, eventEmitter: EventEmitter2);
    validateUser(username: string, pass: string): Promise<{
        uuid: string;
        email: string;
        unit_id: number;
        profile: import("../profile/models/profile.model").Profile[];
        applications: import("../applications/application.model").ApplicationModel[];
        accounts: import("../accounts/models/account.model").AccountModel[];
        id?: any;
        createdAt?: any;
        updatedAt?: any;
        deletedAt?: any;
        version?: any;
        _attributes: any;
        _creationAttributes: any;
        isNewRecord: boolean;
        sequelize: import("sequelize/types").Sequelize;
        _model: import("sequelize/types").Model<any, any>;
    }>;
    login(user: any): Promise<UserAuthenticatedJWTPayload>;
    getNeeded(): Promise<void>;
}
