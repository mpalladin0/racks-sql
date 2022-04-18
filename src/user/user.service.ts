import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { Profile } from 'src/profile/models/profile.model';
import { Name } from 'src/profile/models/name.model';
import { Application } from 'src/applications/models/application.model';


@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    ) {} 

  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const hashedPassword = await this.hashPasswordBeforeCreate(createUserDto.password);

      return await this.userModel.create({
        email: createUserDto.email,
        password: hashedPassword,
      })
    } catch (err) {
      return err
    }
  }

  /**
   * Hashes a given string password using bcrypt 
   * @param password 
   * @returns A hashed password
   */
  private async hashPasswordBeforeCreate(password: string) {
    if (!password) return password;
    const salt = await bcrypt.genSalt(10, 'a');
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
  }

  findAll() {
    return `This action returns all user`;
  }


  async findOne(uuid: string): Promise<User> {
    try {
      return await this.userModel.findOne({
        where: {
          uuid,
        },
        include: [
          {
            model: Profile,
            include: [Name]
          },
          {
            model: Application
          }
        ]
      })
    } catch (err) {
      return err
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      return await this.userModel.findOne({
        where: {
          email: email
        }
      })
    } catch (err) { return err }
  }

  // async createProfile(uuid: string, createProfileDto: CreateProfileDto) {
  //   try {
  //     const profile = await this.profileModel.create({
  //       first_name: createProfileDto.name.first,
  //       middle_name: createProfileDto.name.middle,
  //       last_name: createProfileDto.name.last,
  //     })

  //     const user = await this.findOne(uuid);

  //     user.$add('profile', profile);
  //     user.save();

  //     return user;

  //   } catch (err) {
  //     return err
  //   }
  // }

}
