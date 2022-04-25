import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AccountModel } from './models/account.model';
import { ClearingPeriodsModel } from './models/clearing_periods.model';
import { DepositProductModel } from './models/deposit_product.model';
import { FeesModel } from './models/fees.model';
import { LimitsModel } from './models/limits.model';
import { LimitsDurationModel } from './models/limits.durations.model';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    UserModule,
    SequelizeModule.forFeature([
      AccountModel, 
      DepositProductModel,
      ClearingPeriodsModel, 
      FeesModel,
      LimitsModel,
      LimitsDurationModel,
    ]),
  ],
  controllers: [AccountsController],
  providers: [AccountsService],
  exports: [SequelizeModule]
})
export class AccountsModule {}
