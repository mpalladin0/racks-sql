import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';

@ApiTags('accounts')
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post(':user_uuid/create')
  async createAccount(@Param('user_uuid') user_uuid: string, @Body() createAccountDto: CreateAccountDto) {
    return await this.accountsService.createAccount(user_uuid, createAccountDto);
  }

  @Get(':user_uuid/all')
  async findAll(@Param('user_uuid') user_uuid: string) {
    return await this.accountsService.findAllByUserUUID(user_uuid);
  }

  @Delete(':user_uuid/all/delete')
  deleteAllAccounts(@Param('user_uuid') user_uuid: string) {
    return this.accountsService.deleteAllAccountsByUserUUID(user_uuid);
  }

  @Delete(':user_uuid/:account_uuid/delete')
  deleteAccountByAccountUUID(
    @Param('user_uuid') user_uuid: string,
    @Param('account_uuid') account_uuid: string,
    ) {
    return this.accountsService.deleteAccountByAccountUUID(user_uuid, account_uuid);
  }

  // @Get()
  // findAll() {
  //   return this.accountsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.accountsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
  //   return this.accountsService.update(+id, updateAccountDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.accountsService.remove(+id);
  // }
}
