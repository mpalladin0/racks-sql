import { EventEmitter2 } from '@nestjs/event-emitter';
import { User as UserModel } from 'src/user/models/user.model';
import { CreateProfileDto } from './dto/profile/create-profile.dto';
import { ProfileCreatedEvent } from './events/ProfileCreated.event';
import { ProfileDeletedEvent } from './events/ProfileDeleted.event';
import { Name as NameModel } from './models/name.model';
import { Profile as ProfileModel } from './models/profile.model';
export declare class ProfileService {
    private eventEmitter;
    private readonly nameModel;
    private readonly profileModel;
    private readonly userModel;
    constructor(eventEmitter: EventEmitter2, nameModel: typeof NameModel, profileModel: typeof ProfileModel, userModel: typeof UserModel);
    findOneByUserUUID(user_uuid: string): Promise<any>;
    findAllByUserUUID(user_uuid: string): Promise<any>;
    createProfile(user_uuid: string, createProfileDto: CreateProfileDto): Promise<any>;
    handleDeleteProfileEventName(payload: ProfileDeletedEvent): Promise<void>;
    deleteProfileByUUID(user_uuid: string): Promise<ProfileModel[]>;
    handleProfileEvents(payload: ProfileCreatedEvent | ProfileDeletedEvent): Promise<string>;
}
