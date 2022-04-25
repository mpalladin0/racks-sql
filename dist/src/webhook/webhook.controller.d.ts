import { WebhookService } from './webhook.service';
import { UpdateWebhookDto } from './dto/update-webhook.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class WebhookController {
    private readonly eventEmitter;
    private readonly webhookService;
    constructor(eventEmitter: EventEmitter2, webhookService: WebhookService);
    create(payload: any): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateWebhookDto: UpdateWebhookDto): string;
    remove(id: string): string;
}
