import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/user.model';
import { isEmpty, Subject } from 'rxjs';
import _ from 'lodash';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  @ApiResponse({ status: 201, description: 'The user has succesfully been created.'})
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string): Promise<User> {
    try {
      return this.userService.findOne(uuid);
    } catch (err) { 
      return err }
  }

}
