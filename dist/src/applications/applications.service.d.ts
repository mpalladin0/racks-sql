import { Unit } from '@unit-finance/unit-node-sdk';
import { Profile } from 'src/profile/models/profile.model';
import { User } from 'src/user/models/user.model';
import { CreateApplicationDto } from './dto/create-application.dto';
import { ApplicationRefreshStatusEvent } from './event/ApplicationRefreshStatus.event';
import { Application } from './models/application.model';
export declare class ApplicationsService {
    private readonly userModel;
    private readonly profileModel;
    private readonly applicationModel;
    unit: Unit;
    constructor(userModel: typeof User, profileModel: typeof Profile, applicationModel: typeof Application);
    createApplication(createApplicationDto: CreateApplicationDto): Promise<any>;
    createUnitApplication(user_uuid: string, first_name: string, middle_name: string, last_name: string): Promise<any>;
    findAllApplicationsByUserUUID(user_uuid: string): Promise<Application[]>;
    findOneByApplicationUUID(application_uuid: string): Promise<any>;
    setUnitIDForUser(user_uuid: string): Promise<any>;
    refreshApplicationStatus(event: ApplicationRefreshStatusEvent): Promise<void>;
}
