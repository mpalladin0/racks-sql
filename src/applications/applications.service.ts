import { HttpException, HttpService, HttpStatus, Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/sequelize';
import { CreateApplicationFormRequest, CreateApplicationFormResponse, Unit, UnitResponse } from '@unit-finance/unit-node-sdk';
import { UserAuthenticatedEvent } from 'src/auth/user-authenticated.event';
import { Name } from 'src/profile/models/name.model';
import { Profile } from 'src/profile/models/profile.model';
import { User } from 'src/user/models/user.model';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { ApplicationRefreshStatusEvent } from './event/ApplicationRefreshStatus.event';
import { Application } from './models/application.model';

const UNIT_TOKEN = 'v2.public.eyJyb2xlIjoiYWRtaW4iLCJ1c2VySWQiOiIxNzE1Iiwic3ViIjoicGxhbnRfc2xhY2tlcjBuQGljbG91ZC5jb20iLCJleHAiOiIyMDIzLTA0LTE0VDE2OjMxOjIzLjYyOVoiLCJqdGkiOiIxMzUwOTgiLCJvcmdJZCI6Ijk5NSIsInNjb3BlIjoiYXBwbGljYXRpb25zIGFwcGxpY2F0aW9ucy13cml0ZSBjdXN0b21lcnMgY3VzdG9tZXJzLXdyaXRlIGN1c3RvbWVyLXRhZ3Mtd3JpdGUgY3VzdG9tZXItdG9rZW4td3JpdGUgYWNjb3VudHMgYWNjb3VudHMtd3JpdGUgY2FyZHMgY2FyZHMtd3JpdGUgY2FyZHMtc2Vuc2l0aXZlIGNhcmRzLXNlbnNpdGl2ZS13cml0ZSB0cmFuc2FjdGlvbnMgdHJhbnNhY3Rpb25zLXdyaXRlIGF1dGhvcml6YXRpb25zIHN0YXRlbWVudHMgcGF5bWVudHMgcGF5bWVudHMtd3JpdGUgcGF5bWVudHMtd3JpdGUtY291bnRlcnBhcnR5IHBheW1lbnRzLXdyaXRlLWFjaC1kZWJpdCBjb3VudGVycGFydGllcyBjb3VudGVycGFydGllcy13cml0ZSBiYXRjaC1yZWxlYXNlcyBiYXRjaC1yZWxlYXNlcy13cml0ZSB3ZWJob29rcyB3ZWJob29rcy13cml0ZSBldmVudHMgZXZlbnRzLXdyaXRlIGF1dGhvcml6YXRpb24tcmVxdWVzdHMgYXV0aG9yaXphdGlvbi1yZXF1ZXN0cy13cml0ZSBjaGVjay1kZXBvc2l0cyBjaGVjay1kZXBvc2l0cy13cml0ZSByZWNlaXZlZC1wYXltZW50cyByZWNlaXZlZC1wYXltZW50cy13cml0ZSBkaXNwdXRlcyBjaGFyZ2ViYWNrcyBjaGFyZ2ViYWNrcy13cml0ZSByZXdhcmRzIHJld2FyZHMtd3JpdGUiLCJvcmciOiJCb29tIiwic291cmNlSXAiOiIiLCJ1c2VyVHlwZSI6Im9yZyIsImlzVW5pdFBpbG90IjpmYWxzZX17wiw8WXgy-cwxzerOBxjD6jZDJv6YLCQK36uXEfT5vrxDOsXnBQo15Al_hvg9yL5qTY-CVbltsh_d125-A4cD'
const UNIT_API_URL = 'https://api.s.unit.sh/'

@Injectable()
export class ApplicationsService {
  unit = new Unit(UNIT_TOKEN, UNIT_API_URL)

  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(Profile) private readonly profileModel: typeof Profile,
    @InjectModel(Application) private readonly applicationModel: typeof Application,
  ) {}

  async createApplication(createApplicationDto: CreateApplicationDto) {
    const { user_uuid } = createApplicationDto;
    try {
      const Profile = await this.profileModel.findOne({ where: { user_uuid: user_uuid }});
      if (Profile === null) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: 'User profile must be created before creating an application',
        }, HttpStatus.NOT_FOUND);
      }
    } catch (err) {
      return err;
    }


    try {
      const User = await this.userModel.findOne({
        where: { uuid: user_uuid },
        include: [
          {
            model: Profile,
            include: [Name]
          }
        ]
      })


      const {
        data: {
          type,
          attributes,
          id
        }
      }: UnitResponse<CreateApplicationFormResponse> = await this.createUnitApplication(user_uuid, User.profile[0].name[0].first, User.profile[0].name[0].middle, User.profile[0].name[0].last)

      const Application = await this.applicationModel.create({
        url: attributes.url,
        unit_id: id
      })

      await User.$add('applications', Application)
      await User.save();
      return Application;

    } catch (err) { 
      return err 
    }
  }

  /**
   * 
   * @param user_uuid 
   */
  async createUnitApplication(user_uuid: string, first_name: string, middle_name: string, last_name: string) {
      const applicationFormRequest: CreateApplicationFormRequest = {
        type: 'applicationForm',
        attributes: {
            applicantDetails: {
                "ssn": "000000002",
                "fullName": this.unit.helpers.createFullName(first_name, last_name),
                "dateOfBirth": "2001-08-10",
                "address": this.unit.helpers.createAddress("20 Ingram St", null, "Forest Hills", "CA", "11375", "US"),
                "email": "april@baxter.com",
                "phone": this.unit.helpers.createPhone("1", "2025550158"),
                "ein": "123456789",
                "dba": "Pied Piper Inc",
            },
            tags: {
                "internal_user_uuid": user_uuid
            }
        },
    }

    try {
      return await this.unit.applicationForms.create(applicationFormRequest)
    } catch (err) { return err }
  }

  /**
   * 
   * @param user_uuid 
   * @returns all applications for a given user_uuid
   */
  async findAllApplicationsByUserUUID(user_uuid: string) {
    return await this.applicationModel.findAll({
      where: {
        user_uuid: user_uuid
      }
    })
  }

  async findOneByApplicationUUID(application_uuid: string) {
    try {
      const application = await this.applicationModel.findOne({
        where: {
          application_uuid
        }
      })

      if (application) return application
      else return `Application ${application_uuid} could not be found.`
    } catch (err) {
      return err
    }
  }

  async setUnitIDForUser(user_uuid: string) {
    const user = await this.userModel.findOne({ where: { uuid: user_uuid }})
    const response = await this.unit.applications.get('360995')
    const unit_id = response.data.relationships.customer.data.id
    
    try {
      await user.$set('unit_id', unit_id)

      return user
    } catch (err) { return err }
  }

  @OnEvent('applications.status.refresh')
  async refreshApplicationStatus(event: ApplicationRefreshStatusEvent) {
    const Applications = await this.applicationModel.findAll({ where: { user_uuid: event.user_uuid }})

    // pending = 'pending',
    // pending_review = 'pending_review',
    // approved = 'approved',
    // denied = 'denied',
    // awaiting_documents = 'awaiting_documents'


    Applications.forEach(async application_form => {
      const { status } = application_form;

      switch (status) {
        case 'pending': 
          console.log(application_form.unit_id);


          const { data } = await this.unit.applicationForms.get(application_form.unit_id)
          console.log(data.attributes.stage)

        break;
        case 'pending_review': 


        break;
        case 'approved':

        break;
        case 'denied':

        break;

        case 'awaiting_documents':

        break;
        default:
          return new Error(`Unknown status ${status}`)
      }
    })
  }

}
