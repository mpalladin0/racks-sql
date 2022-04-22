import { NestMiddleware } from '@nestjs/common';
export declare class RawBodyMiddleware implements NestMiddleware {
    constructor();
    use(req: Request, res: Response, next: () => any): any;
}
