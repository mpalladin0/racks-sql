import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiHeader, ApiTags } from '@nestjs/swagger';
import { Unit, UnitResponse } from '@unit-finance/unit-node-sdk';
import { UNIT_API_TOKEN, UNTI_API_ENDPOINT_URL } from 'secrets/secrets.constants';
import { ApplicationsService } from './applications.service';
import { CreateApplicationFormDto } from './forms/dto/create-application-form.dto';
import { UpdateApplicationDto } from './forms/dto/update-application-form.dto';
import { ApplicationFormModel } from './forms/application-form.model';
import { ApplicationModel } from './application.model';
@ApiTags('applications')
@Controller('applications')
export class ApplicationsController {
  unit = new Unit(UNIT_API_TOKEN, UNTI_API_ENDPOINT_URL)

  constructor(
    private readonly logger: Logger,
    private readonly applicationsService: ApplicationsService) 
    {}

  /**
   * 
   * @param user_uuid 
   * @returns An new application link assigned to a given user_uuid to complete
   */
  @ApiBody({ type: [CreateApplicationFormDto] })
  @Post('create')
  @ApiCreatedResponse({
    description: 'The application form has been successfully created.',
    type: ApplicationModel.name,
  })
  createApplicationForm(@Body() createApplicationForm: CreateApplicationFormDto) {

    this.logger.warn("Creating Application...", createApplicationForm)

    return this.applicationsService.createApplication(createApplicationForm);
  }

  /**
   * 
   * @param application_uuid
   * @returns a previously created application
   */
  @Get(':application_uuid')
  findOneByApplicationUUID(@Param('application_uuid') application_uuid: string) {
    return this.applicationsService.findOne_by_ApplicationUUID(application_uuid);
  }

  /**
   * 
   * @param user_uuid
   * @returns all application links for a given user_uuid
   */
  @Get(':user_uuid/all')
  async findAllForUser(@Param('user_uuid') user_uuid: string) {
    // await this.applicationsService.setUnitIDForUser(user_uuid);

    return this.applicationsService.findAll_Applications_by_UserUUID(user_uuid);
  }

  /**
   * To do: Auto-update / remove old applications when their status changes 
   * @param payload 
   */
  /**
   * Application Form Status Webhook
   * See: https://docs.unit.co/application-forms#keeping-track-of-the-application-form-status
   * @param payload 
   */
  @Post('webhook')
  async webhook(@Body() payload: any) {
    payload.data.forEach(response => {
      switch (response.type) {
        case 'application.denied': {
          const res: UnitResponse<any> = response
          console.log("New denied created", res)
        }

        break;
        case 'application.awaitingDocuments': {
          const res: UnitResponse<any> = response
          console.log("New awaitingDocuments created", res);
 
        }

        break;
        case 'application.pendingReview': {
          const res: UnitResponse<any> = response
          console.log("New pendingReview", res);

        }

        break;


        case 'customer.created': {
          const res: UnitResponse<any> = response
          console.log("New customer created", res);

        }

        break;
        default:
          throw new Error("Unknown type" + response.type)

      }
    });
  }

}
