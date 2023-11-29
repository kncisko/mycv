import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Query,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SerializeInterceptor } from './interceptors/serialize.interceptor';

@Controller('auth')
export class UsersController {
  constructor(private _service: UsersService) {}

  @Post('/signup')
  createUser(@Body() dto: CreateUserDto) {
    this._service.create(dto.email, dto.password);
  }

  @UseInterceptors(SerializeInterceptor)
  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this._service.findOne(parseInt(id));
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this._service.find(email);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this._service.update(parseInt(id), dto);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this._service.remove(parseInt(id));
  }
}
