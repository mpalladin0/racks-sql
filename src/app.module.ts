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

@Module({
  imports: [
    EventEmitterModule.forRoot({
      wildcard: true,
    }),
    SequelizeModule.forRoot({
      synchronize: true,
      autoLoadModels: true,
      logging: false,
      dialect: DB_DIALECT,
      host: DB_HOST,
      database: DB_DATABASE,
      username: DB_USERNAME,
      password: DB_PASSWORD,
      port: DB_PORT,
      ssl: true,
      dialectOptions: { 
        ssl: { require: true, rejectUnauthorized: false }
      },
  
      // dialect: 'mssql',
      // dialectModule: tedious,
      // database: 'racks',
      // username: 'racksadmin',
      // password: 'cepFem-jigme4-gemdej',
      // host: 'racks.database.windows.net',
      // autoLoadModels: true,
      // synchronize: true,
    }),
    UserModule,
    AccountsModule,
    ApplicationsModule,
    ProfileModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
