import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/sequelize';
import { User as UserModel } from 'src/user/models/user.model';
import { CreateProfileDto } from './dto/profile/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileCreatedEvent } from './events/ProfileCreated.event';
import { ProfileDeletedEvent } from './events/ProfileDeleted.event';
import { Name as NameModel } from './models/name.model';
import { Profile as ProfileModel } from './models/profile.model';
import { Residence as ResidenceModel } from './models/residence.model';

@Injectable()
export class ProfileService {
  constructor(
    private eventEmitter: EventEmitter2,
    @InjectModel(NameModel) private readonly nameModel: typeof NameModel,
    @InjectModel(ProfileModel) private readonly profileModel: typeof ProfileModel,
    @InjectModel(UserModel) private readonly userModel: typeof UserModel,
  ) {}

  async findOneByUserUUID(user_uuid: string) {
    try {
      return await this.profileModel.findOne({ where: { user_uuid }, include: [
        { model: NameModel },
        { model: ResidenceModel }
      ]})
    } catch (err) { return err.message }
  }

  async findAllByUserUUID(user_uuid: string) {
    try {
      return await this.profileModel.findAll({ where: { user_uuid }, include: [
        { model: NameModel },
        { model: ResidenceModel }
      ]})
    } catch (err) { return err.message }
  }

  /**
   * 
   * @param user_uuid 
   * @param createProfileDto 
   * @returns a newly created profile assigned to a given user_uuid
   */
  async createProfile(user_uuid: string, createProfileDto: CreateProfileDto) {
    try {
      const [Profile, created] = await this.profileModel.findOrCreate({
        where: { user_uuid: user_uuid },
        include: [
          { model: NameModel },
          { model: ResidenceModel }
        ],
        defaults: {
          user_uuid: user_uuid,
          name: [{
            first: createProfileDto.name.first,
            middle: createProfileDto.name.middle,
            last: createProfileDto.name.last,
          }],
          residence: [{
            type: createProfileDto.residence.type,
            zip_code: createProfileDto.residence.zip_code,
            address: createProfileDto.residence.address,
            city: createProfileDto.residence.city,
          }]
        },
      })

      if (created) return Profile;
      else return Profile;

    } catch (err) {
      return err;
    }
  }

  @OnEvent('profile.deleted')
  async handleDeleteProfileEventName(payload: ProfileDeletedEvent) {
    // this.nameModel.find
    console.log(payload)
  }

  async deleteProfileByUUID(user_uuid: string) {
    const Profile = await this.profileModel.findAll({
      where: { user_uuid },
    })

    Profile.forEach(async profile => {
      await profile.destroy()
    })

    this.eventEmitter.emit('profile.deleted', new ProfileDeletedEvent(user_uuid))

    return Profile;
  }

  @OnEvent('profile.*')
  async handleProfileEvents(payload: ProfileCreatedEvent | ProfileDeletedEvent) {
    switch (payload.type) {
      case 'profile.created': {
        console.log("Profile event dispatched", payload);
      }
      break;
      case 'profile.deleted': {
        console.log("Profile event dispatched", payload);

      }
      break;
      default:
        return `Unknown payload type ${payload}`
    }

  }
}
