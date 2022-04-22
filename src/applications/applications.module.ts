import { Module } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/user/models/user.model';
import { Application } from './models/application.model';
import { UserModule } from 'src/user/user.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    UserModule,
    SequelizeModule.forFeature([Application])
  ],
  controllers: [ApplicationsController],
  providers: [ApplicationsService],
  exports: [SequelizeModule]
})
export class ApplicationsModule {}
