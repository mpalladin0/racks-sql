import { HttpException, HttpService, HttpStatus, Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/sequelize';
import { CreateApplicationFormRequest, CreateApplicationFormResponse, Unit, UnitResponse } from '@unit-finance/unit-node-sdk';
import { UserAuthenticatedEvent } from 'src/auth/user-authenticated.event';
import { Name } from 'src/profile/models/name.model';
import { Profile } from 'src/profile/models/profile.model';
import { User } from 'src/user/models/user.model';
import { CreateApplicationFormDto } from './forms/dto/create-application-form.dto';
import { UpdateApplicationDto } from './forms/dto/update-application-form.dto';
import { ApplicationRefreshStatusEvent } from './forms/event/ApplicationRefreshStatus.event';
import { ApplicationFormModel } from './forms/application-form.model';
import { ApplicationModel } from './application.model';
import { ApplicationDocumentsModel } from './documents/application-documents.model';
import { Residence } from 'src/profile/models/residence.model';

const UNIT_TOKEN = 'v2.public.eyJyb2xlIjoiYWRtaW4iLCJ1c2VySWQiOiIxNzE1Iiwic3ViIjoicGxhbnRfc2xhY2tlcjBuQGljbG91ZC5jb20iLCJleHAiOiIyMDIzLTA0LTE0VDE2OjMxOjIzLjYyOVoiLCJqdGkiOiIxMzUwOTgiLCJvcmdJZCI6Ijk5NSIsInNjb3BlIjoiYXBwbGljYXRpb25zIGFwcGxpY2F0aW9ucy13cml0ZSBjdXN0b21lcnMgY3VzdG9tZXJzLXdyaXRlIGN1c3RvbWVyLXRhZ3Mtd3JpdGUgY3VzdG9tZXItdG9rZW4td3JpdGUgYWNjb3VudHMgYWNjb3VudHMtd3JpdGUgY2FyZHMgY2FyZHMtd3JpdGUgY2FyZHMtc2Vuc2l0aXZlIGNhcmRzLXNlbnNpdGl2ZS13cml0ZSB0cmFuc2FjdGlvbnMgdHJhbnNhY3Rpb25zLXdyaXRlIGF1dGhvcml6YXRpb25zIHN0YXRlbWVudHMgcGF5bWVudHMgcGF5bWVudHMtd3JpdGUgcGF5bWVudHMtd3JpdGUtY291bnRlcnBhcnR5IHBheW1lbnRzLXdyaXRlLWFjaC1kZWJpdCBjb3VudGVycGFydGllcyBjb3VudGVycGFydGllcy13cml0ZSBiYXRjaC1yZWxlYXNlcyBiYXRjaC1yZWxlYXNlcy13cml0ZSB3ZWJob29rcyB3ZWJob29rcy13cml0ZSBldmVudHMgZXZlbnRzLXdyaXRlIGF1dGhvcml6YXRpb24tcmVxdWVzdHMgYXV0aG9yaXphdGlvbi1yZXF1ZXN0cy13cml0ZSBjaGVjay1kZXBvc2l0cyBjaGVjay1kZXBvc2l0cy13cml0ZSByZWNlaXZlZC1wYXltZW50cyByZWNlaXZlZC1wYXltZW50cy13cml0ZSBkaXNwdXRlcyBjaGFyZ2ViYWNrcyBjaGFyZ2ViYWNrcy13cml0ZSByZXdhcmRzIHJld2FyZHMtd3JpdGUiLCJvcmciOiJCb29tIiwic291cmNlSXAiOiIiLCJ1c2VyVHlwZSI6Im9yZyIsImlzVW5pdFBpbG90IjpmYWxzZX17wiw8WXgy-cwxzerOBxjD6jZDJv6YLCQK36uXEfT5vrxDOsXnBQo15Al_hvg9yL5qTY-CVbltsh_d125-A4cD'
const UNIT_API_URL = 'https://api.s.unit.sh/'

@Injectable()
export class ApplicationsService {
  unit = new Unit(UNIT_TOKEN, UNIT_API_URL)

  constructor(
    private readonly logger: Logger,
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(Profile) private readonly profileModel: typeof Profile,
    @InjectModel(ApplicationModel) private readonly applicationModel: typeof ApplicationModel,
    @InjectModel(ApplicationDocumentsModel) private readonly applicationDocumentsModel: typeof ApplicationDocumentsModel,
    @InjectModel(ApplicationFormModel) private readonly applicationFormModel: typeof ApplicationFormModel,
  ) {}


  async createApplication(createApplicationFormDto: CreateApplicationFormDto) {
    const { user_uuid } = createApplicationFormDto;

    /**
     * Ensure user has a @Profile before creating new @Applicaton
     * If not, throw a new error
     */
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
            include: [
              { model: Name },
              { model: Residence }
            ]
          }
        ]
      })

      this.logger.warn(User.toJSON());

      const {
        data: {
          type,
          attributes,
          id
        }
      }: UnitResponse<CreateApplicationFormResponse> = await this.createUnitApplicationForm(user_uuid, User.profile[0].name[0].first, User.profile[0].name[0].middle, User.profile[0].name[0].last)

      this.logger.warn(type, attributes, id);

      const Application = await this.applicationModel.create(
        {
          user_uuid: user_uuid,
          form: [{
            url: attributes.url,
            id: id,
          }]    
        }, {
        include: [
          { model: ApplicationFormModel },
          { model: ApplicationDocumentsModel }
        ]
      })

      this.logger.warn(Application);

      return Application;


    } catch (err) {
      return err;
    }


  }

  // async createApplicationForm(createApplicationFormDto: CreateApplicationFormDto) {
  //   const { user_uuid } = createApplicationFormDto;
  //   try {
  //     const Profile = await this.profileModel.findOne({ where: { user_uuid: user_uuid }});
  //     if (Profile === null) {
  //       throw new HttpException({
  //         status: HttpStatus.NOT_FOUND,
  //         error: 'User profile must be created before creating an application',
  //       }, HttpStatus.NOT_FOUND);
  //     }
  //   } catch (err) {
  //     return err;
  //   }

  //   try {
  //     const User = await this.userModel.findOne({
  //       where: { uuid: user_uuid },
  //       include: [
  //         {
  //           model: Profile,
  //           include: [Name]
  //         }
  //       ]
  //     })


  //     const {
  //       data: {
  //         type,
  //         attributes,
  //         id
  //       }
  //     }: UnitResponse<CreateApplicationFormResponse> = await this.createUnitApplicationForm(user_uuid, User.profile[0].name[0].first, User.profile[0].name[0].middle, User.profile[0].name[0].last)

  //     const ApplicationForm = await this.applicationFormModel.create({
  //       url: attributes.url,
  //       unit_id: id
  //     })

  //     await User.$add('application_forms', ApplicationForm)
  //     await User.save();
  //     return ApplicationForm;

  //   } catch (err) { 
  //     return err 
  //   }
  // }

  /**
   * 
   * @param user_uuid 
   */
  async createUnitApplicationForm(user_uuid: string, first_name: string, middle_name: string, last_name: string) {
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
  async findAllApplicationFormsByUserUUID(user_uuid: string) {
    return await this.applicationFormModel.findAll({
      where: {
        user_uuid: user_uuid
      }
    })
  }

  async findOne_by_ApplicationFormUUID(application_form_uuid: string) {
    try {
      const ApplicationForm = await this.applicationFormModel.findOne({
        where: { application_form_uuid: application_form_uuid }
      })

      if (ApplicationForm) return ApplicationForm
      else throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: `Application Form ${application_form_uuid} not found.`,
      }, HttpStatus.NOT_FOUND)
    } catch (err) {
      return err
    }
  }

  async findOne_by_ApplicationUUID(application_uuid: string) {
    try {
      const Application = await this.applicationModel.findOne({
        where: {
          application_uuid: application_uuid
        }
      })

      if (Application) return Application
      else throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: `Application ${application_uuid} not found.`,
      }, HttpStatus.NOT_FOUND)
    } catch (err) {
      return err
    }
  }

  async findAll_Applications_by_UserUUID (user_uuid: string) {
    const Applications = await this.applicationModel.findAll({
      where: { user_uuid: user_uuid },
      include: [
        { model: ApplicationFormModel },
        { model: ApplicationDocumentsModel }
      ]
    })

    if (Applications.length == 0) throw new HttpException({
      status: HttpStatus.NOT_FOUND,
      error: `User ${user_uuid} has no applications.`
    }, HttpStatus.NOT_FOUND) 

    return Applications;
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

  // @OnEvent('applications.status.refresh')
  // async refreshApplicationStatus(event: ApplicationRefreshStatusEvent) {
  //   const Applications = await this.applicationFormModel.findAll({ where: { user_uuid: event.user_uuid }})

  //   // pending = 'pending',
  //   // pending_review = 'pending_review',
  //   // approved = 'approved',
  //   // denied = 'denied',
  //   // awaiting_documents = 'awaiting_documents'


  //   Applications.forEach(async application_form => {
  //     const { status } = application_form;

  //     switch (status) {
  //       case 'pending': 
  //         console.log(application_form.unit_id);


  //         const { data } = await this.unit.applicationForms.get(application_form.unit_id)
  //         console.log(data.attributes.stage)

  //       break;
  //       case 'pending_review': 


  //       break;
  //       case 'approved':

  //       break;
  //       case 'denied':

  //       break;

  //       case 'awaiting_documents':

  //       break;
  //       default:
  //         return new Error(`Unknown status ${status}`)
  //     }
  //   })
  // }

}
