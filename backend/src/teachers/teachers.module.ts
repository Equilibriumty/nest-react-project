import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { PrismaService } from 'src/prisma.service';
import { CourseService } from 'src/course/course.service';

@Module({
  controllers: [TeachersController],
  providers: [TeachersService, PrismaService, CourseService],
  exports: [TeachersService],
})
export class TeachersModule {}
