import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';
import { CourseModule } from './course/course.module';

@Module({
  imports: [
    StudentsModule,
    TeachersModule,
    AuthModule,
    ConfigModule.forRoot({ envFilePath: `.env` }),
    StudentsModule,
    TeachersModule,
    CourseModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
