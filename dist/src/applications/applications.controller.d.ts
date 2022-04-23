import { Logger } from '@nestjs/common';
import { Unit } from '@unit-finance/unit-node-sdk';
import { ApplicationsService } from './applications.service';
import { CreateApplicationFormDto } from './forms/dto/create-application-form.dto';
import { ApplicationModel } from './application.model';
export declare class ApplicationsController {
    private readonly logger;
    private readonly applicationsService;
    unit: Unit;
    constructor(logger: Logger, applicationsService: ApplicationsService);
    createApplicationForm(createApplicationForm: CreateApplicationFormDto): Promise<any>;
    findOneByApplicationUUID(application_uuid: string): Promise<any>;
    findAllForUser(user_uuid: string): Promise<ApplicationModel[]>;
    webhook(payload: any): Promise<void>;
}
