import { Unit } from '@unit-finance/unit-node-sdk';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { Application } from './models/application.model';
export declare class ApplicationsController {
    private readonly applicationsService;
    unit: Unit;
    constructor(applicationsService: ApplicationsService);
    create(createApplicationDto: CreateApplicationDto): Promise<any>;
    findOneByApplicationUUID(application_uuid: string): Promise<any>;
    findAllForUser(user_uuid: string): Promise<Application[]>;
    webhook(payload: any): Promise<void>;
}
