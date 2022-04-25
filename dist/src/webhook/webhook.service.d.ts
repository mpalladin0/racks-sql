import { CreateWebhookDto } from './dto/create-webhook.dto';
import { UpdateWebhookDto } from './dto/update-webhook.dto';
export declare class WebhookService {
    create(createWebhookDto: CreateWebhookDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateWebhookDto: UpdateWebhookDto): string;
    remove(id: number): string;
}
