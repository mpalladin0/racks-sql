import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/user/models/user.model';
import { CreateProfileDto } from './dto/profile/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Name } from './models/name.model';
import { Profile } from './models/profile.model';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Name) private readonly nameModel: typeof Name,
    @InjectModel(Profile) private readonly profileModel: typeof Profile,
    @InjectModel(User) private readonly userModel: typeof User,
  ) {}

  async findOneByUserUUID(user_uuid: string) {
    try {
      return await this.profileModel.findOne({ where: { user_uuid }, include: [{
        model: Name
      }]})
    } catch (err) { return err.message }
  }

  /**
   * 
   * @param user_uuid 
   * @param createProfileDto 
   * @returns a newly created profile assigned to a given user_uuid
   */
  async createProfile(user_uuid: string, createProfileDto: CreateProfileDto) {
    // console.log("runnig")
    let user: User;
    let profile: Profile;
    let name: Name;

    try {
      user = await this.userModel.findOne({ where: { uuid: user_uuid }})
      profile = await this.profileModel.create({})

      try {
        await user.$add('profile', profile)
        await user.save()
      } catch (err) { return err; }

    } catch (err) {
      return err.message
    }

    try {
      const name = await this.nameModel.create({
        first: createProfileDto.name.first,
        middle: createProfileDto.name.middle,
        last: createProfileDto.name.last
      })
      await profile.$add('name', name);
      await profile.save();
      return name;
    } catch (err) { return err.message }
  }

  /**
   * 
   * @param user_uuid 
   * @param first 
   * @param middle 
   * @param last 
   * @returns {Name} A name object
   */
  async createName(user_uuid: string, first: string, middle: string, last: string): Promise<Name> {
    try {
      return await this.nameModel.create({
        first,
        middle,
        last
      })
    } catch (err) {
      return err
    }

  }

  async deleteByUserUUID(user_uuid: string) {
    let profile: Profile;
    try {
      profile = await this.profileModel.findOne({ where: { user_uuid }}) 
    } catch (err) { return err }

    try {
      return await profile.destroy()
    } catch (err) { return err }
  }

  // findAll() {
  //   return `This action returns all profile`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} profile`;
  // }

  // update(id: number, updateProfileDto: UpdateProfileDto) {
  //   return `This action updates a #${id} profile`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} profile`;
  // }
}
