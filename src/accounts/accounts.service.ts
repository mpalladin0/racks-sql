import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/user/models/user.model';
import { CreateAccountDto } from './dto/create-account.dto';
import { AccountModel } from './models/account.model';
import { ClearingPeriodsModel } from './models/clearing_periods.model';
import { DepositProductModel } from './models/deposit_product.model';
import { FeesModel } from './models/fees.model';
import { LimitsModel } from './models/limits.model';
// import { CreateAccountDto } from './dto/create-account.dto';
// import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(AccountModel) private readonly accountModel: typeof AccountModel,
  ) {}

  async createAccount(user_uuid: string, createAccountDto: CreateAccountDto) {
    try {
      const [Account, created] = await this.accountModel.findOrCreate({
        where: { user_uuid: user_uuid },
        include: [
          { 
            model: DepositProductModel, 
            include: [
              { model: FeesModel },
              { model: LimitsModel },
              { model: ClearingPeriodsModel }
            ]
          }
        ],
        defaults: {
          user_uuid: user_uuid,
          deposit_product: [{
            purpose: createAccountDto.deposit_product.purpose,
            tier: createAccountDto.deposit_product.tier,
            fees: [{
              ach_transer: 1.25,
              atm_in_network: 1.25,
              atm_out_network: 1.25,
            }],
          }],
        },
      })

      if (created) return Account;
      else return Account;

    } catch (err) {
      return err
    }
  }

  async findAllByUserUUID(user_uuid: string) {
    try {
      return await this.accountModel.findAll({ where: { user_uuid: user_uuid }, include: [
        { 
          model: DepositProductModel,
          include: [
            { model: FeesModel },
            { model: LimitsModel },
            { model: ClearingPeriodsModel }
          ]
        }
      ]})
    } catch (err) { return err.message }
  }

  async deleteAllAccountsByUserUUID(user_uuid: string) {
    const Accounts = await this.accountModel.findAll({
      where: { user_uuid },
    })

    Accounts.forEach(async account => {
      await account.destroy()
    })


    return Accounts;
  }

  async deleteAccountByAccountUUID(user_uuid: string, account_uuid: string) {
    try {
      await this.accountModel.destroy({
        where: { 
          user_uuid: user_uuid,
          account_uuid: account_uuid 
        }
      })
    } catch (err) {
      return err
    }

  }
}
