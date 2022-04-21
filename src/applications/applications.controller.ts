import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiHeader, ApiTags } from '@nestjs/swagger';
import { Unit, UnitResponse } from '@unit-finance/unit-node-sdk';
import { UNIT_API_TOKEN, UNTI_API_ENDPOINT_URL } from 'secrets/secrets.constants';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { Application } from './models/application.model';
@ApiTags('applications')
@Controller('applications')
export class ApplicationsController {
  unit = new Unit(UNIT_API_TOKEN, UNTI_API_ENDPOINT_URL)

  constructor(private readonly applicationsService: ApplicationsService) {}

  /**
   * 
   * @param user_uuid 
   * @returns An new application link assigned to a given user_uuid to complete
   */
  @ApiBody({ type: [CreateApplicationDto] })
  @Post('create')
  @ApiCreatedResponse({
    description: 'The application has been successfully created.',
    type: Application.name,
  })
  create(@Body() createApplicationDto: CreateApplicationDto) {
    return this.applicationsService.createApplication(createApplicationDto);
  }

  /**
   * 
   * @param application_uuid
   * @returns a previously created application link 
   */
  @Get(':application_uuid')
  findOneByApplicationUUID(@Param('application_uuid') application_uuid: string) {
    return this.applicationsService.findOneByApplicationUUID(application_uuid);
  }

  /**
   * 
   * @param user_uuid
   * @returns all application links for a given user_uuid
   */
  @Get(':user_uuid/all')
  async findAllForUser(@Param('user_uuid') user_uuid: string) {
    await this.applicationsService.setUnitIDForUser(user_uuid);

    return this.applicationsService.findAllApplicationsByUserUUID(user_uuid);
  }

  /**
   * To do: Auto-update / remove old applications when their status changes 
   * @param payload 
   */
  @Post('webhook')
  async webhook(@Body() payload: any) {
    payload.data.forEach(response => {
      switch (response.type) {
        case 'customer.updated': {
          const res: UnitResponse<any> = response
          console.log("Customer updated...", res.data.attributes.changes)
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

    // const response = await this.unit.applications.get('360995')
    // console.log({ ...data})
    // const type = payload.data.type;

    // switch (type) {
    //   case 'customer.archied': {
    //     console.log("Customer archived")
    //   }
    //   break;

    //   case 'customer.created': {
    //     console.log("new customer created")
    //   }

    //   default:
    //     throw new Error("Invalid response type" + type)
    // }

    // console.log(payload)
  }

}
