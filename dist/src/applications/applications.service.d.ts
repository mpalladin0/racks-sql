import { Logger } from '@nestjs/common';
import { Unit } from '@unit-finance/unit-node-sdk';
import { Profile } from 'src/profile/models/profile.model';
import { User } from 'src/user/models/user.model';
import { CreateApplicationFormDto } from './forms/dto/create-application-form.dto';
import { ApplicationFormModel } from './forms/application-form.model';
import { ApplicationModel } from './application.model';
import { ApplicationDocumentsModel } from './documents/application-documents.model';
export declare class ApplicationsService {
    private readonly logger;
    private readonly userModel;
    private readonly profileModel;
    private readonly applicationModel;
    private readonly applicationDocumentsModel;
    private readonly applicationFormModel;
    unit: Unit;
    constructor(logger: Logger, userModel: typeof User, profileModel: typeof Profile, applicationModel: typeof ApplicationModel, applicationDocumentsModel: typeof ApplicationDocumentsModel, applicationFormModel: typeof ApplicationFormModel);
    createApplication(createApplicationFormDto: CreateApplicationFormDto): Promise<any>;
    createUnitApplicationForm(user_uuid: string, first_name: string, middle_name: string, last_name: string): Promise<any>;
    findAllApplicationFormsByUserUUID(user_uuid: string): Promise<ApplicationFormModel[]>;
    findOne_by_ApplicationFormUUID(application_form_uuid: string): Promise<any>;
    findOne_by_ApplicationUUID(application_uuid: string): Promise<any>;
    findAll_Applications_by_UserUUID(user_uuid: string): Promise<ApplicationModel[]>;
    setUnitIDForUser(user_uuid: string): Promise<any>;
}
