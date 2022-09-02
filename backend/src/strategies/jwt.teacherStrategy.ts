import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TeachersService } from 'src/teachers/teachers.service';

@Injectable()
export class JwtTeacherStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly teachersService: TeachersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  async validate(payload: { sub: number; email: string }) {
    const data = { id: payload.sub, email: payload.email };

    const user = await this.teachersService.findById(data.id);

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
