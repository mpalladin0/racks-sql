import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/profile/create-profile.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class ProfileController {
    private eventEmitter;
    private readonly profileService;
    constructor(eventEmitter: EventEmitter2, profileService: ProfileService);
    findOneProfileByUserUUID(user_uuid: string): Promise<any>;
    findAllProfilesByUserUUID(user_uuid: string): Promise<any>;
    findOneProfile(user_uuid: string, createProfileDto: CreateProfileDto): Promise<any>;
    deleteProfile(user_uuid: string): Promise<import("./models/profile.model").Profile[]>;
}
