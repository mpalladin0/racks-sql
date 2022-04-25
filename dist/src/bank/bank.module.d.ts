import { DynamicModule } from '@nestjs/common';
export interface BankModuleOptions {
    url: string;
    api_token: string;
}
export declare class BankModule {
    static forRoot(options: BankModuleOptions): DynamicModule;
}
