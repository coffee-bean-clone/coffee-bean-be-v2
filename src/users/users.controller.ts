import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @HttpCode(HttpStatus.OK)
  @Post('/join')
  createUser(@Body() userInfo) {
    return this.usersService.registerUser(userInfo);

    /**
  {
    "email": "user1@example.com",
    "password": "password123",
    "name": "User One",
    "address": "123 Main Street, City, Country",
    "phoneNumber": "123-456-7890"
  }
    */
  }
  @Post('/login')
  login(@Body() userInfo) {
    return this.usersService.authenticateUser(
      userInfo.email,
      userInfo.password,
    );
    /**
  {
    "email": "user1@example.com",
    "password": "password123",
  }
     */
  }
}
