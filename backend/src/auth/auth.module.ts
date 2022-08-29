import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalStrategy } from '../strategies/local.strategy';
import { AuthController } from './auth.controller';
import { JwtStrategy } from 'src/strategies/jwt.strategy';
import { PrismaService } from 'src/prisma.service';
import { TeachersModule } from 'src/teachers/teachers.module';
import { StudentsModule } from 'src/students/students.module';

@Module({
  imports: [
    TeachersModule,
    StudentsModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtService,
    JwtStrategy,
    PrismaService,
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
