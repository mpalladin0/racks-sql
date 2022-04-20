import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { User as UserModel } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { Profile as ProfileModel } from 'src/profile/models/profile.model';
import { Name as NameModel } from 'src/profile/models/name.model';
import { Application as ApplicationModel } from 'src/applications/models/application.model';
import { Applications } from '@unit-finance/unit-node-sdk';
import { Residence as ResidenceModel } from 'src/profile/models/residence.model';


@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: typeof UserModel,
    ) {} 

  public async createUser(createUserDto: CreateUserDto): Promise<UserModel> {
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


  async findOne(uuid: string): Promise<UserModel> {
    try {
      return await this.userModel.findOne({
        where: {
          uuid,
        },
        include: [
          { 
            model: ProfileModel,
            include: [
              { model: NameModel },
              { model: ResidenceModel }
            ]
          },
          {
            model: ApplicationModel
          },
          
        ]
      })
    } catch (err) {
      return err
    }
  }

  async findOneByEmail(email: string): Promise<UserModel> {
    try {
      return await this.userModel.findOne({
        where: {
          email: email
        }, 
        include: [
          {
            model: ApplicationModel
          }
        ]
      })
    } catch (err) { return err }
  }
}
