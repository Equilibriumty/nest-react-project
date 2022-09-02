import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalTeacherStrategy } from '../strategies/local.teacherStrategy';
import { LocalStudentStrategy } from '../strategies/local.studentStrategy';
import { AuthController } from './auth.controller';
import { JwtStudentStrategy } from 'src/strategies/jwt.studentStrategy';
import { JwtTeacherStrategy } from 'src/strategies/jwt.teacherStrategy';
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
    LocalStudentStrategy,
    LocalTeacherStrategy,
    JwtService,
    JwtStudentStrategy,
    JwtTeacherStrategy,
    PrismaService,
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
