import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { UpdateWebhookDto } from './dto/update-webhook.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UnitEvent } from '@unit-finance/unit-node-sdk';
import { UnitEventRacks } from '../bank/event/UnitEvent.racks.event';

@Controller('webhook')
export class WebhookController {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly webhookService: WebhookService
    ) {}

  @Post()
  create(@Body() payload: any) {
    const { data } = payload;

    data.forEach(event => {
      const { attributes, id, type, relationships } = event as UnitEvent;
      this.eventEmitter.emit('unit', new UnitEventRacks(attributes, id, type, relationships));
    })
    return this.webhookService.create(payload);
  }

  @Get()
  findAll() {
    return this.webhookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.webhookService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWebhookDto: UpdateWebhookDto) {
    return this.webhookService.update(+id, updateWebhookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.webhookService.remove(+id);
  }
}
