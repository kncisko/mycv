// To use class validation, run the following commands:
// npm install class-validator
// npm install class-transformer

import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
