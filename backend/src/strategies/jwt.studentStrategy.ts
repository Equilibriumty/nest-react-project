import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { StudentsService } from 'src/students/students.service';

@Injectable()
export class JwtStudentStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly studentsService: StudentsService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  async validate(payload: { sub: string; email: string }) {
    const data = { id: payload.sub, email: payload.email };

    const user = await this.studentsService.findById(data.id);

    if (!user) {
      throw new UnauthorizedException('No access to this page');
    }
    return {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
      username: user.username,
    };
  }
}
