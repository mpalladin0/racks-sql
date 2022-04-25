import { DynamicModule, Global, Module, Options } from '@nestjs/common';
import { CONFIG_OPTIONS } from './constants';
import { RacksBank } from './racksbank.service';
import { UnitServce } from './unit.service';

export interface BankModuleOptions {
    url: string;
    api_token: string
  }

@Global()
@Module({})
export class BankModule {
    static forRoot(options: BankModuleOptions): DynamicModule {
        return {
            module: BankModule,
            global: true,
            providers: [
                {
                    provide: CONFIG_OPTIONS,
                    useValue: options,
                },
                RacksBank,
                UnitServce,
            ],
            exports: [RacksBank],
        }
    }
}
