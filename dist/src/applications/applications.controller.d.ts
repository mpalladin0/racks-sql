import { Logger } from '@nestjs/common';
import { Unit } from '@unit-finance/unit-node-sdk';
import { ApplicationsService } from './applications.service';
import { CreateApplicationFormDto } from './forms/dto/create-application-form.dto';
import { CreateApplicationFormSimulationDto } from './forms/dto/create-application-form-simulate.dto';
import { SimulateApplicationEventDto } from './submitted/dto/simulate-application-event.dto';
export declare class ApplicationsController {
    private readonly logger;
    private readonly applicationsService;
    unit: Unit;
    constructor(logger: Logger, applicationsService: ApplicationsService);
    createApplicationForm(createApplicationForm: CreateApplicationFormDto): Promise<any>;
    createApplication_Simulate(createApplicationFormSimulation: CreateApplicationFormSimulationDto): Promise<any>;
    simulateApplicationEvent(simulateApplicationEveneDto: SimulateApplicationEventDto): Promise<void>;
    findOneByApplicationUUID(application_uuid: string): Promise<any>;
    findAllSubmittedUser(user_uuid: string): Promise<void>;
    webhook(payload: any): Promise<void>;
}
