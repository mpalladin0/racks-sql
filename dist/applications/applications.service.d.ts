import { Unit } from '@unit-finance/unit-node-sdk';
import { UserAuthenticatedEvent } from 'src/auth/user-authenticated.event';
import { User } from 'src/user/models/user.model';
import { CreateApplicationDto } from './dto/create-application.dto';
import { Application } from './models/application.model';
export declare class ApplicationsService {
    private readonly userModel;
    private readonly applicationModel;
    unit: Unit;
    constructor(userModel: typeof User, applicationModel: typeof Application);
    createApplication(createApplicationDto: CreateApplicationDto): Promise<any>;
    createUnitApplication(user_uuid: string, first_name: string, middle_name: string, last_name: string): Promise<any>;
    findAllApplicationsByUserUUID(user_uuid: string): Promise<Application[]>;
    findOneByApplicationUUID(application_uuid: string): Promise<any>;
    setUnitIDForUser(user_uuid: string): Promise<any>;
    refreshApplicationStatus(payload: UserAuthenticatedEvent): Promise<void>;
}
