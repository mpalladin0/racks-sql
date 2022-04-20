import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AccountModel } from './models/account.model';
import { ClearingPeriodsModel } from './models/clearing_periods.model';
import { DepositProductModel } from './models/deposit_product.model';
import { FeesModel } from './models/fees.model';
import { LimitsModel } from './models/limits.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      AccountModel, 
      ClearingPeriodsModel, 
      DepositProductModel,
      FeesModel,
      LimitsModel,
    ]),
  ],
  controllers: [AccountsController],
  providers: [AccountsService],
  exports: [SequelizeModule]
})
export class AccountsModule {}
