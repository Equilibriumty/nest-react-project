import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TeacherExistsGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const user = context.switchToHttp().getRequest().body;
    const user1 = await this.prisma.teacher.findFirst({
      where: {
        OR: [
          {
            email: user.email,
          },
          { username: user.username },
        ],
      },
    });
    if (user1 === null) {
      return true;
    }
    if (user1.email === user.email || user1.username === user.username) {
      throw new ForbiddenException(
        'User with such email or username already exists',
      );
    }
  }
}
