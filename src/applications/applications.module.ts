import { Module } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/user/models/user.model';
import { Application } from './models/application.model';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    UserModule,
    SequelizeModule.forFeature([Application])
  ],
  controllers: [ApplicationsController],
  providers: [ApplicationsService],
  exports: [SequelizeModule]
})
export class ApplicationsModule {}
