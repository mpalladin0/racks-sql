import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/user.model';
import { isEmpty, Subject } from 'rxjs';
import _ from 'lodash';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {

    const user = this.userService.findOne(uuid);

    // If we have a user, we need to check their application status from Unit and update any changes
    try {
      
    } catch (err) { return err }

    return user;
  }

  // @Post(':uuid/profile')
  // findOneProfile(@Param('uuid') uuid: string, @Body() createProfileDto: CreateProfileDto) {
  //   return this.userService.createProfile(uuid, createProfileDto)
  // }
}
