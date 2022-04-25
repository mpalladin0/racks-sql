import { Inject, Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import path from 'path';
import { CONFIG_OPTIONS } from './constants';
import { ConfigOptions } from './interfaces/config-options.interface';
import { Unit } from '@unit-finance/unit-node-sdk';
import { OnEvent } from '@nestjs/event-emitter';
import { UnitEventRacks } from './event/UnitEvent.racks.event';
import { UnitServce } from './unit.service';

@Injectable()
export class RacksBank {
  private readonly unitService: UnitServce;
  public readonly unitRef: Unit;

  constructor(@Inject(CONFIG_OPTIONS) options: ConfigOptions) {
      const API_TOKEN = options.api_token;
      const API_URL = options.url;


    try {
      fs.readdir(__dirname+`/interfaces/unit/json`, (err, files) => {
        console.log('\tCompiling Unit interfaces...')
        console.log(files);
      })
    } catch (err) {
      throw err;
    }



    try {
      this.unitRef = new Unit(API_TOKEN, API_URL); 
    } catch (err) {
      throw err;
    }
  }

  @OnEvent('unit')
  public async handleUnitEvents(event: UnitEventRacks) {
    // console.log(event)

    switch (event.type) {
      case 'customer.created':  
        const { attributes, id, relationships, type } = event.getCustomerCreatedEvent(event.type)

        const applicationId = relationships.application.data.id;
        const unitId = relationships.customer.data.id;
         
        console.log(applicationId, unitId)
      
        // console.log("Customer created!", Event.relationships.application.data.id);
      break


    }
  } 


}

