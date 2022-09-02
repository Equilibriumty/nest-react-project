import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { Student } from '@prisma/client';

@Injectable()
export class LocalStudentStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(
    email: string,
    password: string,
  ): Promise<Omit<Student, 'password'>> {
    const student = await this.authService.validateStudent(email, password);
    if (!student) {
      throw new UnauthorizedException();
    }
    return student;
  }
}
