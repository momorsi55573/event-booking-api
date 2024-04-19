/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { AuthDto, UserDto } from 'src/utils/dto';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('users')
 async createUser(@Body() dto: UserDto): Promise<string> {
    return await this.usersService.createUser(dto);
  }

  @Post('auth')
 async auth(@Body() dto: AuthDto): Promise<{ access_token: string;}> {
    return await this.usersService.auth(dto);
  }
}
