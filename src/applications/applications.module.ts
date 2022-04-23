import { Logger, Module } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/user/models/user.model';
import { ApplicationFormModel } from './forms/application-form.model';
import { UserModule } from 'src/user/user.module';
import { HttpModule } from '@nestjs/axios';
import { ProfileModule } from 'src/profile/profile.module';
import { ApplicationDocumentsModel } from './documents/application-documents.model';
import { ApplicationModel } from './application.model';

@Module({
  imports: [
    HttpModule,
    ProfileModule,
    UserModule,
    SequelizeModule.forFeature([
      ApplicationModel,
      ApplicationFormModel,
      ApplicationDocumentsModel,
    ])
  ],
  controllers: [ApplicationsController],
  providers: [ApplicationsService, Logger],
  exports: [SequelizeModule]
})
export class ApplicationsModule {}
