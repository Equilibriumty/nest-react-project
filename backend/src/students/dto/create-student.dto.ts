import { Role } from '@prisma/client';
import { IsEmail, IsString, Length } from 'class-validator';
export class CreateStudentDto {
  @IsString()
  @Length(4, 30, { message: 'Username from 4 to 30' })
  username: string;

  @Length(6, 20, { message: 'Password length should be from 6 to 20 chars' })
  password: string;

  @IsEmail(undefined, { message: 'Wrong email' })
  email: string;

  @IsString()
  role: Role;
}
