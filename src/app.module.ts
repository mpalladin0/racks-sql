import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AccountsModule } from './accounts/accounts.module';
import { ApplicationsModule } from './applications/applications.module';
import { ProfileModule } from './profile/profile.module';
import { AuthModule } from './auth/auth.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { DB_DATABASE, DB_DIALECT, DB_HOST, DB_PASSWORD, DB_PORT, DB_USERNAME } from 'secrets/secrets.constants';
import { AdminModule } from '@adminjs/nestjs';
import { User } from './user/models/user.model';
import { Profile } from './profile/models/profile.model';
import { Name } from './profile/models/name.model';
import { Residence } from './profile/models/residence.model';
import { ApplicationFormModel } from './applications/forms/application-form.model';
import { AccountModel } from './accounts/models/account.model';
import { ClearingPeriodsModel } from './accounts/models/clearing_periods.model';
import { DepositProductModel } from './accounts/models/deposit_product.model';
import { FeesModel } from './accounts/models/fees.model';
import { LimitsModel } from './accounts/models/limits.model';
import { ApplicationModel } from './applications/application.model';
import { ApplicationDocumentsModel } from './applications/documents/application-documents.model';
// import { WinstonModule, utilities } from 'nest-winston';
// import winston from 'winston';
@Module({
  imports: [
    // WinstonModule.forRoot({
    //   transports: [
    //     new winston.transports.Console({
    //       format: winston.format.combine(
    //         winston.format.timestamp(),
    //         winston.format.ms(),
    //       ),
    //     }),
    //     // other transports...
    //   ],
    // }),
    EventEmitterModule.forRoot({
      wildcard: true,
    }),
    SequelizeModule.forRoot({
      synchronize: true,
      autoLoadModels: true,
      logging: true,
      dialect: DB_DIALECT,
      host: DB_HOST || DB_HOST,
      database: process.env.DATABASE_DATABASE || DB_DATABASE,
      username: process.env.DATABASE_USERNAME || DB_USERNAME,
      password: process.env.DATABASE_DATABASE || DB_PASSWORD,
      port: DB_PORT,
      ssl: true,
      dialectOptions: { 
        ssl: { require: true, rejectUnauthorized: false }
      },
    }),
    UserModule,
    AccountsModule,
    ApplicationsModule,
    ProfileModule,
    AuthModule,
    AdminModule.createAdmin({
      adminJsOptions: {
        rootPath: '/admin',
        resources: [
          User,
          Profile,
          Name,
          Residence,
          ApplicationModel,
          ApplicationDocumentsModel,
          ApplicationFormModel,
          AccountModel,
          ClearingPeriodsModel,
          DepositProductModel,
          FeesModel,
          LimitsModel
        ],

      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
