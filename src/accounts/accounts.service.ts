import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/sequelize';
import { Unit } from '@unit-finance/unit-node-sdk';
import { User } from 'src/user/models/user.model';
import { CreateAccountDto } from './dto/create-account.dto';
import { AccountModel } from './models/account.model';
import { ClearingPeriodsModel } from './models/clearing_periods.model';
import { DepositProductModel } from './models/deposit_product.model';
import { FeesModel } from './models/fees.model';
import { LimitsDurationModel } from './models/limits.durations.model';
import { LimitsModel } from './models/limits.model';


const UNIT_TOKEN = 'v2.public.eyJyb2xlIjoiYWRtaW4iLCJ1c2VySWQiOiIxNzE1Iiwic3ViIjoicGxhbnRfc2xhY2tlcjBuQGljbG91ZC5jb20iLCJleHAiOiIyMDIzLTA0LTE0VDE2OjMxOjIzLjYyOVoiLCJqdGkiOiIxMzUwOTgiLCJvcmdJZCI6Ijk5NSIsInNjb3BlIjoiYXBwbGljYXRpb25zIGFwcGxpY2F0aW9ucy13cml0ZSBjdXN0b21lcnMgY3VzdG9tZXJzLXdyaXRlIGN1c3RvbWVyLXRhZ3Mtd3JpdGUgY3VzdG9tZXItdG9rZW4td3JpdGUgYWNjb3VudHMgYWNjb3VudHMtd3JpdGUgY2FyZHMgY2FyZHMtd3JpdGUgY2FyZHMtc2Vuc2l0aXZlIGNhcmRzLXNlbnNpdGl2ZS13cml0ZSB0cmFuc2FjdGlvbnMgdHJhbnNhY3Rpb25zLXdyaXRlIGF1dGhvcml6YXRpb25zIHN0YXRlbWVudHMgcGF5bWVudHMgcGF5bWVudHMtd3JpdGUgcGF5bWVudHMtd3JpdGUtY291bnRlcnBhcnR5IHBheW1lbnRzLXdyaXRlLWFjaC1kZWJpdCBjb3VudGVycGFydGllcyBjb3VudGVycGFydGllcy13cml0ZSBiYXRjaC1yZWxlYXNlcyBiYXRjaC1yZWxlYXNlcy13cml0ZSB3ZWJob29rcyB3ZWJob29rcy13cml0ZSBldmVudHMgZXZlbnRzLXdyaXRlIGF1dGhvcml6YXRpb24tcmVxdWVzdHMgYXV0aG9yaXphdGlvbi1yZXF1ZXN0cy13cml0ZSBjaGVjay1kZXBvc2l0cyBjaGVjay1kZXBvc2l0cy13cml0ZSByZWNlaXZlZC1wYXltZW50cyByZWNlaXZlZC1wYXltZW50cy13cml0ZSBkaXNwdXRlcyBjaGFyZ2ViYWNrcyBjaGFyZ2ViYWNrcy13cml0ZSByZXdhcmRzIHJld2FyZHMtd3JpdGUiLCJvcmciOiJCb29tIiwic291cmNlSXAiOiIiLCJ1c2VyVHlwZSI6Im9yZyIsImlzVW5pdFBpbG90IjpmYWxzZX17wiw8WXgy-cwxzerOBxjD6jZDJv6YLCQK36uXEfT5vrxDOsXnBQo15Al_hvg9yL5qTY-CVbltsh_d125-A4cD'
const UNIT_API_URL = 'https://api.s.unit.sh/'

@Injectable()
export class AccountsService {
  unit = new Unit(UNIT_TOKEN, UNIT_API_URL)

  constructor(
    private eventEmitter: EventEmitter2,
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(AccountModel) private readonly accountModel: typeof AccountModel,
  ) {}

  async createAccount(user_uuid: string, createAccountDto: CreateAccountDto) {
    const User = await this.userModel.findOne({ where: { uuid: user_uuid } });

    const UnitAccount = await this.unit.accounts.create({
      attributes: {
        depositProduct: "checking", 
      },
      relationships: {
        customer: {
          data: {
            id: User.unit_id.toString(),
            type: "customer"
          }
        }
      },
      type: 'depositAccount',
    })



    console.log(UnitAccount)

    try {
      const UNIT_ROUTING_NUMBER = UnitAccount.data.attributes.routingNumber.toString()
      const UNIT_ACCOUNT_NUMBER = UnitAccount.data.attributes.accountNumber.toString();

      console.log(UNIT_ROUTING_NUMBER, UNIT_ACCOUNT_NUMBER)

      const [Account, created] = await this.accountModel.findOrCreate({
        where: { user_uuid: user_uuid },
        include: [
          { 
            model: DepositProductModel, 
            include: [
              { model: FeesModel },
              { 
                model: LimitsModel, 
                include: [
                  { model: LimitsDurationModel, as: 'debit', attributes: ['daily', 'weekly', 'monthly'] },
                  { model: LimitsDurationModel, as: 'credit', attributes: ['daily', 'weekly', 'monthly'] },
                  { model: LimitsDurationModel, as: 'atm_withdrawl', attributes: ['daily', 'weekly', 'monthly'] },
                  { model: LimitsDurationModel, as: 'deposit', attributes: ['daily', 'weekly', 'monthly']  },
                ] 
              },
              { model: ClearingPeriodsModel }
            ]
          }
        ],
        defaults: {
          user_uuid: user_uuid,
          deposit_product: [{
            routing_number: UNIT_ROUTING_NUMBER,
            account_number: UNIT_ACCOUNT_NUMBER,
            purpose: createAccountDto.deposit_product.purpose,
            tier: createAccountDto.deposit_product.tier,
            fees: [{
              ach_transfer: 1.25,
              atm_in_network: 1.25,
              atm_out_network: 1.25,
            }],
            limits: [{
              debit: [{
                daily: 300,
                weekly: 2100,
                monthly: 8400,
              }],
              credit: [{
                daily: 300,
                weekly: 2100,
                monthly: 8400,
              }],
              atm_withdrawl: [{
                daily: 300,
                weekly: 2100,
                monthly: 8400,
              }],
              deposit: [{
                daily: 300,
                weekly: 2100,
                monthly: 8400,
              }],
            }]
          }],
        },
      })

      if (created) return Account;

      Account.$set('account_number', UNIT_ACCOUNT_NUMBER);
      Account.$set("routing_number", UNIT_ROUTING_NUMBER);
      await Account.save();

      return Account;

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
            { 
              model: LimitsModel,
              include: [
                { model: LimitsDurationModel, as: 'debit', attributes: ['daily', 'weekly', 'monthly'] },
                { model: LimitsDurationModel, as: 'credit', attributes: ['daily', 'weekly', 'monthly'] },
                { model: LimitsDurationModel, as: 'deposit', attributes: ['daily', 'weekly', 'monthly'] },
                { model: LimitsDurationModel, as: 'atm_withdrawl', attributes: ['daily', 'weekly', 'monthly'] },
              ]
            },
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

  @OnEvent('account.status.*')
  async handleAccountStatusEvents() {
    console.log("Checking account status..")
  }
}
