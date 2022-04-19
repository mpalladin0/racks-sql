import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/profile/create-profile.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':user_uuid')
  findOneProfileByUserUUID(@Param('user_uuid') user_uuid: string) {
    return this.profileService.findOneByUserUUID(user_uuid);
  }

  @ApiBody({ type: [CreateProfileDto] })
  @Post(':user_uuid/create')
  findOneProfile(@Param('user_uuid') user_uuid: string, @Body() createProfileDto: CreateProfileDto) {
    return this.profileService.createProfile(user_uuid, createProfileDto)
  }

  @Delete(':user_uuid/delete')
  deleteProfile(@Param('user_uuid') user_uuid: string) {
    return this.profileService.deleteByUserUUID(user_uuid);
  }

  // @Post()
  // create(@Body() createProfileDto: CreateProfileDto) {
  //   return this.profileService.create(createProfileDto);
  // }

  // @Get()
  // findAll() {
  //   return this.profileService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.profileService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
  //   return this.profileService.update(+id, updateProfileDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.profileService.remove(+id);
  // }
}
