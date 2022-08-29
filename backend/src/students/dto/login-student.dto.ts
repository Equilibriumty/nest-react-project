import { IsEmail, IsInt, Length } from 'class-validator';

export class LoginStudentDto {
  @IsInt()
  id: number;

  @IsEmail(undefined, { message: 'Wrong email' })
  email: string;

  @Length(6, 20, { message: 'Password length should be from 6 to 20 chars' })
  password: string;
}
