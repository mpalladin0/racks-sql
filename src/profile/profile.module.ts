import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Profile } from './models/profile.model';
import { Residence } from './models/residence.model';
import { Name } from './models/name.model';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    UserModule,
    SequelizeModule.forFeature([Name, Residence, Profile]),
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [SequelizeModule]
})
export class ProfileModule {}
