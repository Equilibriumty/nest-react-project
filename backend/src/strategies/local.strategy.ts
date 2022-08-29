import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { Student, Teacher } from '@prisma/client';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validateTeacher(
    email: string,
    password: string,
  ): Promise<Omit<Teacher, 'password'>> {
    const teacher = await this.authService.validateTeacher(email, password);
    if (!teacher) {
      throw new UnauthorizedException();
    }
    return teacher;
  }

  async validateStudent(
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
