import { NestMiddleware } from '@nestjs/common';
export declare class JsonBodyMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: () => any): void;
}
