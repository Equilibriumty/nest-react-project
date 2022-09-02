import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { Teacher } from '@prisma/client';

@Injectable()
export class LocalTeacherStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(
    email: string,
    password: string,
  ): Promise<Omit<Teacher, 'password'>> {
    const teacher = await this.authService.validateTeacher(email, password);
    if (!teacher) {
      throw new UnauthorizedException();
    }
    return teacher;
  }
}
