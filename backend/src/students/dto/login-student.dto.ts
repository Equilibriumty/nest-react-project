import { IsEmail, IsString, IsUUID, Length } from 'class-validator';

export class LoginStudentDto {
  @IsString()
  @IsUUID()
  id: string;

  @IsEmail(undefined, { message: 'Wrong email' })
  email: string;

  @Length(6, 20, { message: 'Password length should be from 6 to 20 chars' })
  password: string;
}
